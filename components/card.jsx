import styles from "./category/cat.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/cart";

//tailwind stuff
import { Select, Option } from "@material-tailwind/react";

export default function ItemCard(props){

    const [count, setCount] = useState(1);
    const e = props.item;
    const [ratio, setRatio] = useState(!!e.category.length? e.category[0]: {ratio:1});

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(add({
            id: e.id,
            quantity: count,
            name: e.name,
            category: ratio,
        }));
        setCount(1);
    }

    console.log(ratio.ratio);

    return(
        <div className={styles.itemCard}>
            <img className={styles.cardImg} src={e.img} alt="" />
            <h4>{e.name}</h4>
            <div className={styles.grid}>
                <div>
                    <p>Rs.{+(e.price*+ratio.ratio).toFixed(2)}</p>
                    <div className={styles.options}>
                        <select onChange={(k)=>{ setRatio(e.category[k.target.value])}}>
                            {
                                e.category.map((e,i) =>{
                                    return <option value={i}>{e.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.delivery}>
                        <img src="/gaddi.png" alt="" />
                        <span>Standard delivery: 21 Sept. <br />9:00am - 1:30pm</span>
                    </div>
                    <div className={styles.quantity}><span>Qty</span>
                        <input type="number" name="clicks" value={count}
                            onChange={(event) => {
                                const value = Number(event.target.value);
                                if(value < 1)
                                    return ;
                                setCount(value);
                            }}
                            />
                    </div>
                </div>
                <div onClick={addToCart} className={styles.add2Cart}><span>ADD</span><img src="/icons/cart.png" alt="" /></div>
            </div>
        </div>
    );
};