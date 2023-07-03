import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../firebase/admin-config";
// import schema from "./formValidator";
const sdk = require('api')('@cashfreedocs-new/v3#173cym2vlivg07d0');

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Get the JSON data from the request body
      const json = req.body;
      let order = await addOrdertoDB(json);
      try {
          let order_res = await sdk.createPaymentLink({
            customer_details: {
                customer_phone: json.userPhone,
                customer_name: json.address.name
                    },
            link_meta: {
              return_url: `http://localhost:3000/account/orders/${order.id}`
            },                    
            link_notify: {send_sms: false, send_email: false},
            link_notes: {newKey: 'New Value'},
            link_id: order.id,
            link_amount: order.total,
            link_currency: 'INR',
            link_purpose: 'veganzo cart',
            link_partial_payments: false,
            link_auto_reminders: false
            },
           {
            'x-client-id': process.env.CASHID,
            'x-client-secret': process.env.CASHSECRET,
            'x-api-version': '2022-09-01'
            })
            return res.status(200).json({ paymentlink: order_res.data.link_url });    
        
      }
       catch (error) {
        console.error(error);
        return res.status(400).json({ error: error });
      }

  
      // Process the JSON data
    //   const { error, value } = schema.validate(jsonData);
    //   if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    //   }
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method not allowed' });
    }
  }

function addOrdertoDB(json){
    //direct use { userID, address timestamp}
    return new Promise(async function(resolve, reject) {
        let total = 0;
        for (const e of json.cart) {
            let invtRef = doc(db, `inventory/${e.type}/stack/${e.id}`) ;
            let storeRef = doc(db, `store/${json.storeids[e.type][0]}/${e.type}/${e.id}`);
            let invtsnap = await getDoc(invtRef);
            let storesnap = await getDoc(storeRef);
            
            if(storesnap.data().quantity > 0){
              total += storesnap.data().price*searchIdInArray(invtsnap.data().catgories, e.category.id)*e.quantity;
              json.storeids[e.type][1] = 1;
           }
        };
        //just eliminating the stores which are not used in cart
        let stores = [];
        for (const store of Object.keys(json.storeids)) {
          if(json.storeids[store][1] > 0)
            stores.push(json.storeids[store][0]);
        }
        //done with totaling cart cost
        let order = await addDoc(collection(db, "orders"), {
            userID: json.userID,
            phone: json.userPhone,
            address: json.address,
            timestamp: new Date().getTime(),
            total: total,
            cart: json.cart,
            payStatus: "pending",
            delivery: "waiting",
            stores,
        })
       resolve({id : order.id, total});
    });
};

function searchIdInArray(jsonArray, targetId) {
    for (let i = 0; i < jsonArray.length; i++) {
      if (jsonArray[i].id === targetId) {
        return jsonArray[i]?.ratio;
      }
    }
    return null;
  }