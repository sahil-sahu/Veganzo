import styles from "./cat.module.css"

export default function Category(){

    const categories = ["Veggies", "Fruits", "Juices", "Shakes", "Hydrators", "Exotics", "Organic", "Plants", "Salads"];

    return(
        <section className="category">
            <div className={styles.container}>
                <h2 className="heading"><img src="/icons/orange.png" alt="" /><span>SHOP BY <span className="up">C</span>ATEGORY</span></h2>
            </div>
            <div class="grid grid-cols-9 gap-2">
                {categories.map((e)=>{
                    return (
                        <div className={styles.card}>
                            <img src={`/assets/category/${e.toLowerCase()}.png`} alt={e} />
                            <h4>{e}</h4>
                        </div>
                    );
                })}
            </div>
            </section>
    );
};