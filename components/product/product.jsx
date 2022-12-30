import styles from "./pdt.module.css";

export default function Product(){

    return(
        <section className={styles.ourproduct}>
            <div className={styles.sidebar}>
                    <h2 className="heading2"><img src="/icons/nutri.png" alt="" /><span>NUTRITIONIST <br/> TALKS</span></h2>
            </div>
            <div className={`${styles.productContainer} grid grid-cols-3 gap-3`}>
                
            </div>
        </section>
    );
};