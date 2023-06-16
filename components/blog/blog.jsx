import styles from "./blog.module.css";

export default function Blog(){

    const article = [
        {
            title: "Article 1",
            img: "/dummy/art1.png",
        },
        {
            title: "Article 2",
            img: "/dummy/art2.png",
        },
        {
            title: "Article 3",
            img: "/dummy/art3.png",
        },
    ]

    return (
        <section className={styles.blog}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2 className="heading2"><img src="/icons/nutri.png" alt="" /><span>NUTRITIONIST <br/> TALKS</span></h2>
                </div>
                <div className={styles.feed}>
                    <div className={styles.feedContainer}>
                        <img src="/dummy/feed.png" alt="a women blogger" />
                    </div>
                    <div className={styles.knowmore}>
                        <h3><img src="/icons/knowmore.svg" alt="knowmore" /><span>KNOW MORE</span></h3>
                    </div>
                </div>
                <div className={styles.moreblogs}>
                    {article.map((e,i)=>{
                        return(
                            <div key={i} className={styles.article}>
                                <img src={e.img} alt={e.title} srcSet="" />
                                <h4>{e.title}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};