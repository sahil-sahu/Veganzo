import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { NextSeo } from 'next-seo';
import { Select, Option } from "@material-tailwind/react";
import Header from '../../components/header/header';
import styles from '../../components/cart/cart.module.css';

export default function Home() {
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
                    {[0,1,2,3].map(e => {
                      return (<li>
                        <div className={styles.radio}></div>
                        <div className={styles.item}>
                          <p>{`Apple`}</p>
                          <select data-te-select-init>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                            <option value="6">Six</option>
                            <option value="7">Seven</option>
                            <option value="8">Eight</option>
                          </select>
                        </div>
                        <div className={styles.cartNum}>
                          <span style={{color: '#ACCEB0',}}>{"+"}</span>
                          <span>{1}</span>
                          <span style={{color: '#ACCEB0',}}>{"-"}</span>
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
