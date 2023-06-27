import styles from "../../styles/Home.module.css"
import srchstyles from "../../components/search/search.module.css"

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import Hero from '../../components/hero/hero';
import Category from '../../components/category/category';
import Blog from '../../components/blog/blog';
import Product from '../../components/product/product';
import Recipe from '../../components/recipes/recipes';
import Nursery from '../../components/nursery/nursery';

import Header from '../../components/header/header';
import ItemCard from "../../components/card";
import { useEffect, useState } from "react"
import { typesense } from "../../typesense/config"

export default function Search({mainData, q}) {
    const router = useRouter();
    const [results, setResult] = useState(mainData);
    const [search, setSearch] = useState(q);
    
    if(router.query.q != search){
      let query = router.query.q;
      (async function(){
        let data = await typesense.collections('inventory').documents().search({
          'q': query,
          'query_by'  : 'name, type',
        });
        setResult(data.hits.map((e)=>{
          return { id : e.document.id, name: e.document.name, img:e.document.cover, price:"120", unit:"kg", type: e.document.type, catgory: JSON.stringify(e.document.catgory), }
        }));
        setSearch(query);
      }())
    }

  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <Header q={router.query.q}></Header>
      <main id="main">
        <section className={srchstyles.searchResults}>
        <div className={`${srchstyles.cardContainer} grid grid-cols-2 gap-2 md:grid-cols-3`}>
                    {results.map((e,i)=>{
                        e.category = JSON.parse(e.catgory)
                        return(
                            <ItemCard key={i} item={e} />
                        );
                    })}
        </div>
        </section>
        <Blog></Blog>
        <Product></Product>
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

export async function getServerSideProps(context) {
  const query = context.query.q;
  if (!query){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  let data = await typesense.collections('inventory').documents().search({
    'q': query,
     'query_by'  : 'name, type',
  });
  return {
    props: {
      mainData: data.hits.map((e)=>{
        // console.log(e.catory);
        return { id : e.document.id, name: e.document.name, img:e.document.cover, price:"120", unit:"kg", type: e.document.type, catgory: JSON.stringify(e.document.catgory),}
      }),
      q: query,
    },
  }
}
