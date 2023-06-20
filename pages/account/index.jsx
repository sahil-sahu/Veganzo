import styles from "../../styles/Home.module.css"

import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { NextSeo } from 'next-seo';
import Header from '../../components/header/header';
import Recipe from "../../components/recipes/recipes";
import Nursery from "../../components/nursery/nursery";

export default function Home() {
  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <Header></Header>
      <main id="main">
        <section className={styles.accounts}>
          <div className={styles.accContainer}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4>
                  Name : Simba
                </h4>
                <h4>
                  Phone : +919078101920
                </h4>
              </div>
            </div>
            <Link href={`account/orders`}>
              <div>
                <Image src={`/icons/checklist.png`} width={200} height={200}/>
                <div>
                  My Orders
                </div>
              </div>
            </Link>
            <Link href={`account/addresses`}>
              <div>
              <Image src={`/icons/location.png`} width={200} height={200}/>
                <div>
                  Addresses
                </div>
              </div>
            </Link>
          </div>
        </section>
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
