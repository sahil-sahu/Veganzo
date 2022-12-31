import Card3 from "../card3";
import styles from "./recipe.module.css"

export default function Recipe(){

    const item = [
        {
            name:"Oats Recipe",
            img:"/assets/recipe/1.png"
        },
        {
            name:"Salad Recipe",
            img:"/assets/recipe/2.png"
        },
        {
            name:"Soup Recipe",
            img:"/assets/recipe/3.png"
        },
    ]

    return(
        <section className={styles.recipes}>
            <div className={styles.recipeContainer}>
                <h2 className="heading"><img src="/icons/reccipe.png" alt="🥕" /><span><span>H</span>EALTHLY RECIPES</span></h2>
                <div className={`${styles.cardContainer} grid grid-cols-3 gap-2`}>
                    {item.map((e)=>{
                        return(
                            <Card3 key={e.title} item={e} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};