import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { NextSeo } from 'next-seo';
import { Radio, Typography, Collapse, } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import Header from '../../components/header/header';
import styles from '../../components/cart/cart.module.css';
import EditAddress from '../../components/accounts/editAddress';
import fetchAddress from '../../components/accounts/helper';
import { useDispatch, useSelector } from 'react-redux';
import { decrement } from '../../redux/cart';
import { useEffect, useRef, useState } from 'react';

export default function Home() {

  const cart = useSelector(state => state.cart.cart);
  const storeDB = useSelector(state => state.locationDB);
  const addresses = useSelector(state => state.authCheck.address);
  const auth = useSelector(state => state.authCheck.auth);
  const dispatch = useDispatch();
  const [total, setTotal] = useState('');
  const [open, setAdd] = useState(0);
  const [add ,setAddress] = useState(false);
  const paymentLoad = useRef({})

  useEffect(()=>{
    setTotal(cart.reduce((acc, e) => acc + e.quantity*e.category.ratio*storeDB[e.type]?.[e.id]?.price ?? 0, 0))
  },[cart])

  useEffect(()=>{
    if(addresses.length == 0 && auth){
      fetchAddress();
    }
  },[auth]);

  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <Header></Header>
      <main id="main">
        <section className={styles.cart}>
            <div className={styles.cartContainer}>
                <div className={styles.invoice}>
                  <h3>
                      my cart
                  </h3>
                  <ul>
                    {cart.map((e,i) => {
                      return (<li key={e.id}>
                        <div className={styles.radio}></div>
                        <div className={styles.item}>
                          <p>{e.name}</p>
                          <p>{e.category.name}</p>
                        </div>
                        <div className={styles.cartNum}>
                          <span onClick={(e)=>{
                            dispatch(decrement({index:i,quantity:-1}));
                          }} style={{color: '#ACCEB0',}}>{"-"}</span>
                          <span>{e.quantity}</span>
                          <span onClick={(e)=>{
                            dispatch(decrement({index:i,quantity:1}));
                          }} style={{color: '#ACCEB0',}}>{"+"}</span>
                        </div>
                        <div className={styles.itemTotal}>
                          ₹{e.quantity*e.category.ratio*storeDB[e.type]?.[e.id]?.price ?? 'error'}
                        </div>
                      </li>);
                    })}
                  </ul>
                  <div className={styles.cartTotal}>
                    <div>
                    <p>
                      Total = ₹{total + 50}
                    </p>
                    </div>
                    <div className={styles.spread}>
                      <p>
                        <span>
                          ( ₹{total}
                        </span>
                        <small>
                          item total
                        </small>
                      </p>
                      +
                      <p>
                        <span>
                          ₹50 )
                        </span>
                        <small>
                          delivery
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                {auth?<div className={styles.process}>
                    <div onClick={()=> setAdd(0)} className={styles.slide}>
                      <div className={styles.line}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Select delivery address
                        </h4>
                        {open === 0 && <>
                        <form onSubmit>
                        {
                        addresses.map((ele, i) => {
                                  return(
                                      <Radio 
                                          key={ele.id}
                                          name={`description`}
                                          id={`address${ele.id}`}
                                          onChange={()=>{ paymentLoad.current.address = ele; setAdd(1);}}
                                          label={
                                          <div>
                                              <Typography color="teal" className="font-medium">{ele.name}</Typography>
                                              <Typography style={{
                                                width: "15rem",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                              }} variant="small" color="gray" className="font-normal">
                                                  {ele.address}
                                              </Typography>
                                          </div>
                                          }
                                          containerProps={{
                                          className: "-mt-5"
                                          }}
                                      />
                                  );
                              })
                          }
                          <Radio 
                              name="description"
                              id="customLocation"
                              onChange={()=> setAddress(true)}
                              label={
                              <div>
                                  <Typography color="teal" className="font-medium">Add New Address</Typography>
                              </div>
                              }
                              containerProps={{
                              className: "-mt-5"
                              }}
                          />
                          {
                            add && <EditAddress open={setAddress} load={{
                              name: ``,
                              phone: ``,
                              address: ``,
                              location: null,
                              id: new Date().getTime(),
                            }} />
                          }
                          <button style={{display:'block'}} className="btn btn-default" type="submit">
                            use this address
                          </button>
                        </form>
                        </>}
                      </div>
                    </div>
                    <div onClick={()=> setAdd(1)} className={styles.slide}>
                      <div className={styles.line2}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Add Payment Method
                        </h4>
                        {open === 1 && <>
                          
                          //Content goes here
                        
                        </>}
                      </div>
                    </div>
                    <div onClick={()=> setAdd(2)} className={styles.slide}>
                      <div className={styles.line3}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Final Checkout
                        </h4>
                        {open === 2 && <>
                          
                          //Content goes here
                        
                        </>}
                      </div>
                    </div>
                </div>: 'Signup First'}
            </div>
        </section>
      </main>
    </>
  )
}
