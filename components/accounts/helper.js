import store from "../../redux/store";
import { authCheckSlice } from "../../redux/fireAuth";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/config";

const fetchAddress = async () =>{
    let docSnapsShots = await getDocs(collection(database, `users/${store.getState().authCheck.id}/address`));
    let arr = [];
    docSnapsShots.forEach(docSnap => {
        arr.push({
            name: docSnap.data().name,
            phone: docSnap.data().phone,
            address: docSnap.data().address,
            location: [docSnap.data().lng, docSnap.data().lat],
            id: docSnap.id
        })
    });
    store.dispatch(authCheckSlice.actions.loadAddress(arr));
}

export default fetchAddress;