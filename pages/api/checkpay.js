import { collection, doc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase/admin-config";
import axios from "axios";
const sdk = require('api')('@cashfreedocs-new/v3#173cym2vlivg07d0');
const AWS = require('aws-sdk');

// Set the AWS region
AWS.config.update({ region: 'eu-north-1' });

// Set your AWS access key ID, secret access key, and session token
AWS.config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

// Create an SNS object
export const sns = new AWS.SNS();

export default async function handler(req, res) {
  let paymentResp = {
    orderid: req.body.data?.order.order_tags.link_id,
    status: req.body.data?.payment.payment_status,
    phone: req.body.data?.customer_details.customer_phone,
  };
  // console.log(req.body);
  if(paymentResp.status === 'SUCCESS' && paymentResp.orderid){
    // check
    // sdk.getPaymentLinkOrders({
    //   link_id: paymentResp.orderid,
    //   'x-client-id': process.env.CASHID,
    //   'x-client-secret': process.env.CASHSECRET,
    //   'x-api-version': '2022-09-01'
    // })


    try {
      const url = `https://sandbox.cashfree.com/pg/links/${paymentResp.orderid}/orders`;
      const headers = {
      'accept': 'application/json',
      'x-api-version': '2022-09-01',
      'x-client-id': process.env.CASHID,
      'x-client-secret': process.env.CASHSECRET,
      'x-api-version': '2022-09-01'
    };
    console.log('making a request');
  // Make the GET request using Axios

    let response = await axios.get(url, { headers });
    let data = response.data;
    if(data[0].order_status ===  "PAID"){
      let docref = doc(collection(db, 'orders'), paymentResp.orderid);
      console.log("Updated order");
      await updateDoc(docref, {
        payStatus: "PAID",
        orderid: data[0].order_id, 
      });
      let sms_response = await sendsms(paymentResp.phone ,paymentResp.orderid);
      return res.status(200).json({"success": "Sab Changasi"});
    }
  } catch(error){
    return res.status(200).json({"error": "Fault at making request to cashfree"});
  }
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
// const headers = {
//   'X-API-Key': process.env.SMSKEY,
//   'Content-Type': 'application/json',
// };
//   return new Promise(async (resolve, reject) => {
//     let res = await axios.post(process.env.SMSURL, JSON.stringify({
//       phone_number : `+91${phone}`,
//       orderid,
//     }), { headers })
//     return resolve(res.data);
//   });

  sns.publish({
    Message: `Order Placed\nGet updates at https://veganzo-git-web-sahilsahus-projects.vercel.app/account/orders/${orderid}`,  // Message to be sent
    PhoneNumber: `+91${phone}`, // Phone number of the recipient
}, (err, data) => {
    if (err) {
        console.error('Error sending message:', err);
    } else {
        console.log('Message sent successfully:', data.MessageId);
    }
  })

}
