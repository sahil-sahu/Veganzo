import styles from "./pdt.module.css";
import Card2 from "../card2";

export default function Product(){

    const dummy = [
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/1.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/2.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/3.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/4.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/5.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/6.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/7.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/8.png",
            price:"200",
        },
        {
            title:"Pomogrenate",
            img:"/dummy/pdt/9.png",
            price:"200",
        },
    ]

    return(
        <section className={styles.ourproduct}>
            <div className={styles.sidebar}>
                    <h2 className="heading2"><span>OUR <br/> PRODUCTS</span></h2>
            </div>
            <div className={`${styles.productContainer} grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3`}>
                {dummy.map((e)=>{
                    return(
                        <Card2 load={e} />
                    );
                })}
            </div>
        </section>
    );
};