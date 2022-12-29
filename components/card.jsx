import styles from "./category/cat.module.css"
import { useState } from "react";

export default function ItemCard(props){

    const [count, setCount] = useState(1);
    const e = props.item;

    return(
        <div className={styles.itemCard}>
            <img className={styles.cardImg} src={e.img} alt="" />
            <h4>{e.name}</h4>
            <div className={styles.grid}>
                <div>
                    <p>Rs.{e.price}/{e.unit}</p>
                    <div className={styles.delivery}>
                        <img src="/gaddi.png" alt="" />
                        <span>Standard delivery: 21 Sept. <br />9:00am - 1:30pm</span>
                    </div>
                    <div className={styles.quantity}><span>Qty</span>
                        <input type="number" name="clicks" value={count}
                            onChange={(event) => {
                                const value = Number(event.target.value);
                                setCount(value);
                            }}
                            />
                    </div>
                </div>
                <div className={styles.add2Cart}><span>ADD</span><img src="/icons/cart.png" alt="" /></div>
            </div>
        </div>
    );
};