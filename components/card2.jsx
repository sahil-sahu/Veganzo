import { useState } from "react";

import styles from "./product/pdt.module.css"

export default function Card2(props){

    const [quantity, setQuantity] = useState(1);
    const load = props.load;

    return(
        <div className={styles.productCard}>
            <div className={styles.thumbnail}>
                <div className={styles.wishlist}></div>
                <img src={load.img} alt="" />
            </div>
            <h4>{load.title}</h4>
            <div className={styles.cart}>
                <div className={styles.pricing}>Rs. {load.price}</div>
                <div className={styles.cartNum}>
                    <span onClick={(e)=>{
                        setQuantity(quantity+1)
                    }}>{"+"}</span>
                    <span>{quantity}</span>
                    <span onClick={(e)=>{
                        if(quantity>1){
                            setQuantity(quantity-1)
                        }
                    }}>{"-"}</span>
                    <span><img src="/icons/cart.png" alt="" /></span>
                </div>
            </div>
        </div>
    );
};