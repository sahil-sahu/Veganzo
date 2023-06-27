import store from "../redux/store";
import { load } from "../redux/locationDB";
import { pinCode } from "../redux/cart";

export async function callLocoDB(lng, lat){
    let res = await fetch(`/api/connectstore?lng=${lng}&lat=${lat}`);
    store.dispatch(load(await res.json()));
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
            const postalCode = data.features[0].context.find(context =>
                context.id.startsWith('postcode')
            );
            if (postalCode) {
                store.dispatch(pinCode(postalCode.text));

            } else {
                console.log('Postal Code not found.');
            }
            } else {
            console.log('No results found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    console.log('Area specific Stocks');
}