// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../firebase/admin-config";

// Distance Calulating stuff
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

//Providing the nearest store based on the category
const nearest = (snap, lng, lat) => {
  let store = {id:snap.docs[0].id , dist: calculateDistance(lat, lng, Number(snap.docs[0].data()).lat, Number(snap.docs[0].data().lng))};
  for (let index = 1; index < snap.docs.length; index++) {
    const ele = array[index];
    let dist = calculateDistance(lat, lng, Number(ele.data()).lat, Number(ele.data().lng));
    console.log(dist);
    if( dist < store.dist )
      store = {id: ele.id , dist};
    
  }
  return store.id;
}
//providing the final store data for respective category
const inventoryFetch = async (type, lng , lat) =>{
  return new Promise(async function(resolve){
    let q = query(collection(db, 'store'),
     where('lng',">=",lng-0.055), where('lng',"<=",lng+0.055),
     where("inventory", "array-contains", type),
      // where('lat',">=",lat-0.045), where('lat',"<=",lat+0.045),
      );
    let stores = await getDocs(q); //fetching stores
    console.log(stores.docs.length);
    if(stores.docs.length > 0) {
      let store = nearest(stores , lng, lat);
      let data = await getDocs(collection(db ,`store/${store}/${type}`));
      console.log(`fetching maindata for store ${type}`);
      let json = {};
      data.forEach(doc => {
        json[doc.id] = {
          stock : doc.data().quantity > 0,
          price : doc.data().price,
        }
      });
      resolve(json);
    };
  });
};

export default async function handler(req, res) {

    let lng = Number(req.query.lng);
    let lat = Number(req.query.lat);
    let VegSnap = inventoryFetch(`vegetables`, lng, lat);
    let FrtSnap = inventoryFetch(`fruits`, lng, lat);
    let BevSnap = inventoryFetch(`beverages`, lng, lat);
    Promise.all([VegSnap, FrtSnap, BevSnap]).then(load => {
      let loadJson = {};
      loadJson.vegetables = load[0];
      loadJson.fruits = load[1];
      loadJson.beverages = load[2];
      res.status(200).json(loadJson);
    })
    .catch(err => {
      res.json(err);
      res.status(405).end();
  });
  }
  