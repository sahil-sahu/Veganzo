import styles from "./category/cat.module.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/cart";

//tailwind stuff
import { Select, Option } from "@material-tailwind/react";

export default function ItemCard(props){

    const [count, setCount] = useState(1);
    const [animation, setanimation] = useState('');
    const e = props.item;
    const [ratio, setRatio] = useState({ratio:1});
    let stock = '"Add Pickup First"';

    useEffect(() =>{
        setRatio(!!e.category.length? e.category[0]: {ratio:1});
    },[e.id]);

    

    const dispatch = useDispatch();
    const addToCart = () => {
        setanimation(styles.clicked);
        dispatch(add({
            id: e.id,
            quantity: count,
            name: e.name,
            category: ratio,
            type,
        }));
        setCount(1);
        setTimeout(() => setanimation(''), 2000);
    }

    const type = e.type? e.type: 'dummy';

    let price = e.price;
    if (type !== 'dummy') {
        let item = useSelector(state => state.locationDB[type]?.[e.id] ?? null);
        if (item) {
            price = Number(item.price);
            stock = item.stock? item.stock: "Out of stock";
        }
    }

    // const localData = useSelector(state => state.locationDB)

    return(
        <div className={styles.itemCard}>
            <img className={styles.cardImg} src={e.img} alt="" />
            <h4>{e.name}</h4>
            <div className={styles.grid}>
                <div>
                    <p>Rs.{+(price*+ratio.ratio).toFixed(2)}</p>
                    <div className={styles.options}>
                        <select onChange={(k)=>{ setRatio(e.category[k.target.value])}}>
                            {
                                e.category.map((e,i) =>{
                                    return <option key={e.id} value={i}>{e.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    {/* <div className={styles.delivery}>
                        <img src="/gaddi.png" alt="" />
                        <span>Standard delivery: 21 Sept. <br />9:00am - 1:30pm</span>
                    </div> */}
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
                {stock===true? <div onClick={addToCart} className={`${styles.add2Cart} ${animation}`}><span>ADD</span><img src="/icons/cart.png" alt="" /></div>: null}
            </div>
                {stock===true? null: stock}
        </div>
    );
};