import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { NextSeo } from 'next-seo';
import Header from '../../components/header/header';
import Recipe from "../../components/recipes/recipes";
import Nursery from "../../components/nursery/nursery";

import styles from '../../components/accounts/address.module.css'
import Address from '../../components/accounts/address';

export default function Home() {
  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <Header></Header>
      <main id="main">
        <div className={styles.address}>
          <div className={styles.addressContainer}>
            <h2>
              List of Addresses
            </h2>
            <form>
              <Address load={{
                name: `Sahil`,
                phone: `6565454654`,
                address: `loremdisjhfuydguyfgduygfuyhg`,
                long: `85`,
                lat: `85`,
              }} />
            </form>
          </div>
        </div>
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
