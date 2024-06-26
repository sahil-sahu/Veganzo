import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Radio, Typography, Button } from "@material-tailwind/react";
import Header from '../../components/header/header';
import styles from '../../components/cart/cart.module.css';
import EditAddress from '../../components/accounts/editAddress';
import fetchAddress from '../../components/accounts/helper';
import { useDispatch, useSelector } from 'react-redux';
import { decrement } from '../../redux/cart';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from "@material-tailwind/react";
import { addLocation } from "../../redux/cart";

export default function Home() {

  const cart = useSelector(state => state.cart.cart);
  const currentLoco = useSelector(state => state.cart.location);
  const storeDB = useSelector(state => state.locationDB);
  const addresses = useSelector(state => state.authCheck.address);
  const {auth, id, phone} = useSelector(state => state.authCheck);
  const dispatch = useDispatch();
  const [total, setTotal] = useState('');
  const [open, setAdd] = useState(0); //section kholne wala
  const [add ,setAddress] = useState(false); //new address wala
  const [location, setLocation] = useState(false);
  const paymentLoad = useRef({payment: "upi"})
  const [placeClicked, setOrder] = useState(true);
  const router = useRouter();

  const collect = async (e)=>{
    e.preventDefault();
    if (!location) {
      return;
    }
    if (currentLoco.id !== location.id) {
      dispatch(addLocation(location));
    }
    paymentLoad.current.address = location.item;
    setTimeout(()=> setAdd(2), 0);
  }

  const placeOrder = async () =>{
    setOrder(false);
    const payload ={
      userID: id,
      userPhone: phone,
      cart: cart,
      paymentMode: paymentLoad.current.payment,
      address: paymentLoad.current.address,
      stores: [storeDB.vegetables.storeinfo?.name, storeDB.fruits.storeinfo?.name, storeDB.beverages.storeinfo?.name],
      storeids: {
        vegetables: [storeDB.vegetables.storeinfo?.name, 0],
        fruits: [storeDB.fruits.storeinfo?.name, 0],
        beverages: [storeDB.beverages.storeinfo?.name, 0],
      },
    }
    if(paymentLoad.current.address && cart.length > 0){
      let response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if(response.status === 200){
        let resp = await response.json();
        // console.log(resp.paymentlink);
        router.push(resp.paymentlink);

      } else{
        console.log("Chud gaya");
        setOrder(true);
      }
    }
  }

  useEffect(()=>{
    if(addresses.length == 0 && auth){
      fetchAddress();
    }
    setTotal(cart.reduce((acc, e) => acc + e.quantity*e.category.ratio*storeDB[e.type]?.[e.id]?.price ?? 0, 0))
  },[auth, cart]);

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
                        {
                          paymentLoad.current.address && <p>selected: {paymentLoad.current.address.name}</p>
                        }
                        {open === 0 && <>
                        <form>
                        {
                        addresses.map((ele, i) => {
                                  return(
                                      <Radio 
                                          key={ele.id}
                                          name={`description`}
                                          id={`address${ele.id}`}
                                          onChange={()=>{ 
                                            setLocation({
                                              lng: ele.location[0],
                                              lat: ele.location[1],
                                              name: '...fetching',
                                              set: true,
                                              id: ele.id,
                                              item: ele,
                                            })
                                          }}
                                          label={
                                          <div>
                                              <Typography color="teal" className="font-medium ">{ele.name}</Typography>
                                              <Typography variant="small" color="gray" className={`font-normal ${styles.txtadress}`}>
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
                          <button onClick={collect} style={{display:'block'}} className={`btn btn-default ${styles.cnfmAdd}`} type="submit">
                            use this address
                          </button>
                        </form>
                        </>}
                      </div>
                    </div>
                    {/* <div onClick={()=> setAdd(1)} className={styles.slide}>
                      <div className={styles.line2}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Add Payment Method
                        </h4>
                        {open === 1 && <>
                          
                          //Content goes here
                        
                        </>}
                      </div>
                    </div> */}
                    <div onClick={()=> paymentLoad.current.address && setAdd(2)} className={styles.slide}>
                      <div className={styles.line3}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Final Checkout
                        </h4>
                        {open === 2 && paymentLoad.current.address && <>
                          
                          {
                            placeClicked? <Button onClick={placeOrder} variant="outlined" className="rounded-full">
                            Place Order
                          </Button>: <Button variant="outlined" className="rounded-full">
                                        please wait <Spinner />
                                      </Button>
                          }
                        
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
