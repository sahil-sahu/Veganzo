import styles from "./nursery.module.css"
import ItemCard from "../card";


export default function Nursery(){

    const item = [
        {
            name:"Calathea Freddie",
            price:"750",
            unit:"-",
            img:"/dummy/organic/3.png"
        },
        {
            name:"Brinjal",
            price:"70",
            unit:"kg",
            img:"/dummy/organic/1.png"
        },
        {
            name:"Broken Heart",
            price:"450",
            unit:"-",
            img:"/dummy/organic/2.png"
        },
    ]

    return(
        <div className={styles.nursery}>
            <div className={styles.nurseryContainer}>
                <h2 className="heading"><img src="/icons/organic.png" alt="🌿" /><span><span className="up">O</span>RGANIC FROM NEIGHBOUR</span></h2>
                <p>
                    GET BEST OF <span className="up">O</span>RGANIC VEGGIES, FRUITS AND PLANTS FROM YOUR NIEGHBOUR NURSERY <br /> BE A REASON TO PROMOTE GREEENARY
                </p>
                <div className={`${styles.cardContainer} grid grid-cols-3 gap-2`}>
                    {item.map((e)=>{
                        return(
                            <ItemCard item={e} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
} ;