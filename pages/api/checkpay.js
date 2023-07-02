import { collection, doc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase/admin-config";
import axios from "axios";
const sdk = require('api')('@cashfreedocs-new/v3#173cym2vlivg07d0');

export default function handler(req, res) {
  let paymentResp = {
    orderid: req.body.data?.link_id,
    status: req.body.data?.order.transaction_status,
    phone: req.body.data?.customer_details.customer_phone,
  };
  if(paymentResp.status === 'SUCCESS' && paymentResp.orderid){
    // check
    // sdk.getPaymentLinkOrders({
    //   link_id: paymentResp.orderid,
    //   'x-client-id': process.env.CASHID,
    //   'x-client-secret': process.env.CASHSECRET,
    //   'x-api-version': '2022-09-01'
    // })
    const url = `https://sandbox.cashfree.com/pg/links/${paymentResp.orderid}/orders`;
    const headers = {
      'accept': 'application/json',
      'x-api-version': '2022-09-01',
      'x-client-id': process.env.CASHID,
      'x-client-secret': process.env.CASHSECRET,
      'x-api-version': '2022-09-01'
    };

// Make the GET request using Axios
    axios.get(url, { headers })
    .then(async ({ data }) => {
      if(data[0].order_status ===  "PAID"){
        let docref = doc(collection(db, 'orders'), paymentResp.orderid);
        console.log("Updated order");
        await updateDoc(docref, {
          payStatus: "PAID",
          orderid: data[0].order_id, 
        });
        sendsms(paymentResp.phone ,paymentResp.orderid);
      }
    })
    .catch(err => console.error(err));
  }


  res.status(200).json({"success": true});
}

async function sendsms(phone, orderid){
//   fetch(process.env.SMSURL, {
//     method: 'POST',
//     headers: {
//         'X-API-Key': process.env.SMSKEY,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       phone_number: `+91${phone}`,
//       orderid,
//     })
// });
const headers = {
  'X-API-Key': process.env.SMSKEY,
  'Content-Type': 'application/json',
};
axios.post(process.env.SMSURL, JSON.stringify({
  phone_number: `+91${phone}`,
  orderid,
}), { headers })
console.log("SMS Sent");

}
