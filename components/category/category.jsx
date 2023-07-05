import styles from "./cat.module.css"
import { useState } from "react";

import ItemCard from "../card";

export default function Category(){


    const categories = ["Veggies", "Fruits", "Juices", "Shakes", "Hydrators", "Exotics", "Organic", "Plants", "Salads"];
    const item = [
        {
            name:"Kashmiri Apple",
            price:"120",
            unit:"kg",
            img:"/dummy/apples.png",
            category : [],
        },
        {
            name:"Avacado",
            price:"150",
            unit:"kg",
            img:"/dummy/avacado.png",
            category : [],
        },
        {
            name:"Kiwi",
            price:"200",
            unit:"kg",
            img:"/dummy/kiwi.png",
            category : [],
        },
    ]

    return(
        <section className={styles.category}>
            <div className={styles.container}>
                <h2 className="heading"><img src="/icons/orange.png" alt="" /><span>SHOP BY <span className="up">C</span>ATEGORY</span></h2>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-9" style={{padding:10,}}>
                {categories.map((e,i)=>{
                    return (
                        <div key={i} className={styles.card}>
                            <img src={`/assets/category/${e.toLowerCase()}.png`} alt={e} />
                            <h4>{e}</h4>
                        </div>
                    );
                })}
            </div>
            <div className={`${styles.fruits} ${styles.cardContainer}`} >
                <h3 className="heading"><img src="/icons/orange.png" alt="orange" /><span><span className="up">F</span>RUITS</span></h3>
                <div className={`${styles.cardContainer} grid grid-cols-2 md:gap-5 gap-2 sm:grid-cols-3`}>
                    {item.map((e,i)=>{
                        return(
                            <ItemCard key={i} item={e} />
                        );
                    })}
                </div>
            </div>
            <div className={`${styles.vegetable} ${styles.cardContainer}`} >
                <h3 className="heading"><img src="/icons/veggy.png" alt="vgegtable" /><span><span className="up">V</span>EGETABLES</span></h3>
                <div className={`${styles.cardContainer} grid grid-cols-2 md:gap-5 gap-2 sm:grid-cols-3`}>
                    {item.map((e,i)=>{
                        return(
                            <ItemCard key={i} item={e} />
                        );
                    })}
                </div>
            </div>
            </section>
    );
};