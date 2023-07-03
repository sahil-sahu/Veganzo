// import styles from "../../../../styles/Home.module.css"
import Header from '../../../../components/header/header';
import Recipe from "../../../../components/recipes/recipes";
import Nursery from "../../../../components/nursery/nursery";

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { database } from "../../../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const TABLE_HEAD = [ "Item", "Category", "Quantity",];

function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes} Dt.${year}-${month}-${day}`;
}

export default function Order(){

    const router = useRouter();
    const { orderid } = router.query;
    const auth = useSelector(state => state.authCheck);

    const [orders, setorders] = useState(false);//cart items
    const [credentials, setCred] = useState(false); //just crendentials

    useEffect(() => {
        async function getOrder(){
            const unsub = onSnapshot(doc(database, "orders", orderid), (doc) => {
                setCred({
                    amount: `₹${doc.data().total}`,
                    date: convertTimestamp(doc.data().timestamp),
                    payment: doc.data().payStatus,
                    delivery: doc.data().delivery,
                    phone: doc.data().phone,
                    id: doc.id,
                    address: `${doc.data().address.name} Ph.${doc.data().address.phone}`
                });
                setorders(
                    doc.data().cart.map((ele)=>{
                        return {
                            item : ele.name,
                            cat: ele.category.name,
                            quantity: ele.quantity,
                            id: ele.id, 
                        }
                    })
                );
                if(doc.data().payStatus == `pending`)
                    retry(doc.id, doc.data().phone);
            });
        };
        if(auth.auth){
            getOrder();
          }
    }, [auth]);

    const retry = async (id, phone) => {
        let resp = await fetch('/api/checkpay', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({data: {
              link_id: id,
              customer_details: {
                  customer_phone:phone,
              },
              order: {
                  transaction_status: 'SUCCESS'
                },
          }})
      });
      console.log(await resp.json());
    }
    
    return  <>
    <NextSeo
        title="Veganzo"
        description=""
      />
    <Header></Header>
    <main id="main">
    <Card className="h-full w-5/6" style={{
        margin: "auto",
        marginTop: "11%",
        padding: "1rem",
      }}>
        {credentials && <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <table className="table-auto w-full text-left">
            <thead>
                <tr>
                <th>Date</th>
                <th>Delivery</th>
                <th>Payment</th>
                <th>Address</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{credentials.date}</td>
                    <td>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={credentials.delivery}
                            color={
                              credentials.delivery === "PAID" ? "green" : credentials.delivery === "pending" ? "amber" : "red"
                            }
                          />
                        </div>
                    </td>
                    <td>
                        <div className="w-max flex gap-1">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={credentials.payment }
                            color={
                              credentials.payment === "PAID" ? "green" : credentials.payment === "pending" ? "amber" : "red"
                            }
                          />
                          {credentials.payment === "pending" && <ArrowPathIcon onClick={() => retry(credentials.id, credentials.phone)} cursor={`pointer`} className='w-4' />}
                        </div>
                    </td>
                    <td>{credentials.address}</td>
                    <td>{credentials.amount}</td>
                </tr>
            </tbody>
        </table>
          </div>
        </CardHeader>}
        <CardBody className="overflow-scroll px-0">
          {
            !orders? <Spinner className="h-16 w-16 text-blue-500/10" /> : orders.length == 0 ? `Buy Somethings first`:
          
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(
                ({
                  item,
                  cat,
                  quantity,
                  id,
                }, index) => {
                    const isLast = index === orders.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {cat}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {quantity}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
          }
        </CardBody>
      </Card>  
      <Recipe></Recipe>
      <Nursery></Nursery>
    </main>
  </>;
}