import styles from "../../../styles/Home.module.css"

import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { query, where, orderBy, getDocs, collection } from "firebase/firestore";  
import { NextSeo } from 'next-seo';
import Header from '../../../components/header/header';
import Recipe from "../../../components/recipes/recipes";
import Nursery from "../../../components/nursery/nursery";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
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
import { useSelector } from "react-redux";
import { database } from "../../../firebase/config";
 
const TABLE_HEAD = [ "Date", "Amount", "Payment", "Delivery", ""];

function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes} Dt.${year}-${month}-${day}`;
}

export default function Orders() {

  const [orders, setorders] = useState(false);
  const auth = useSelector(state => state.authCheck);

  async function getOrders(){
    const ordersRef = collection(database, 'orders');
    const q = query(ordersRef, where("userID", "==", auth.id), orderBy("timestamp", "desc"));
    const fireOrders = await getDocs(q);
    setorders(fireOrders.docs.map((doc) => {
      return{
        amount: `₹${doc.data().total}`,
        date: convertTimestamp(doc.data().timestamp),
        payment: doc.data().payStatus,
        delivery: doc.data().delivery,
        id: doc.id,
      };
    }));
  };

  useEffect(()=>{
    if(auth.auth){
      getOrders();
    }
  }, [auth])

  return (
    <>
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
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Recent Orders
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last orders
              </Typography>
            </div>
          </div>
        </CardHeader>
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
                  amount,
                  date,
                  payment,
                  delivery,
                  id,
                }, index) => {
                  const isLast = index === orders.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={payment}
                            color={
                              payment === "PAID" ? "green" : payment === "pending" ? "amber" : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={delivery}
                            color={
                              delivery === "delivered" ? "green" : delivery === "waiting" ? "amber" : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Link href={`/account/orders/${id}`}>
                          <IconButton variant="text" color="blue-gray">
                            <ArrowRightIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
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
        <section className={styles.playstore}>
          <div className={styles.banda}>
            <img src="assets/banda.svg" alt="" />
          </div>
          <div className={styles.playstoreContainer}>
            <div className={`grid grid-cols-2 gap-2`}>
              <div>  
                <h3>
                  It always feel handy when everything is in <br />your hand 😮‍💨
                </h3>
                <p>
                  Order between 8AM-10PM, get it deliver by 2 hours <br />No minimum order
                </p>
                <img src="/assets/playstore.png" alt="go to playstore" />
                <img src="/assets/appstore.png" alt="go to apple store" />
              </div>
              <div className={styles.phones}>
                <img src="/assets/phones.png" alt="" />
              </div>
            </div>
            <div className={styles.caughtUp}>
              <img src="/assets/caughtup.svg" alt="" />
              <h2>
                You're All Caught Up
              </h2>
              <p>
                Just <a href="#">Click Here</a> Or <a href="">up</a> To Back to top
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
