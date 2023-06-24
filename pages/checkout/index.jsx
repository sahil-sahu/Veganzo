import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { NextSeo } from 'next-seo';
import { Select, Option } from "@material-tailwind/react";
import Header from '../../components/header/header';
import styles from '../../components/cart/cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement } from '../../redux/cart';

export default function Home() {

  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

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
                          ₹640
                        </div>
                      </li>);
                    })}
                  </ul>
                  <div className={styles.cartTotal}>
                    <div>
                    <p>
                      Total = ₹690 
                    </p>
                    </div>
                    <div className={styles.spread}>
                      <p>
                        <span>
                          ( ₹640
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
                <div className={styles.process}>
                    <div className={styles.slide}>
                      <div className={styles.line}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Select delivery address
                        </h4>
                        <form onSubmit>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Male"
                                checked
                                onChange
                              />
                              Male
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Female"
                                checked
                                onChange
                              />
                              Female
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Other"
                                checked
                                onChange
                              />
                              Other
                            </label>
                          </div>
                          <button className="btn btn-default" type="submit">
                            use this address
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className={styles.slide}>
                      <div className={styles.line2}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Add Payment Method
                        </h4>
                      </div>
                    </div>
                    <div className={styles.slide}>
                      <div className={styles.line3}><div className={styles.radio}></div></div>
                      <div className={styles.content}>
                        <h4>
                          Final Checkout
                        </h4>
                      </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  )
}
