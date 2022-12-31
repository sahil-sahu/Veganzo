import styles from "./recipes/recipe.module.css"

export default function Card3(props){

    const e = props.item;

    return(
        <div className={styles.itemCard}>
            <img className={styles.cardImg} src={e.img} alt="" />
            <h4>{e.name}</h4>
        </div>
    );
};