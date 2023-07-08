import styles from './footer.module.css'

import Image from "next/image";
import truck from "../../public/icons/truck.svg";
import wallet from "../../public/icons/wallet.svg";
import insta from "../../public/icons/instagram.svg";
import fb from "../../public/icons/facebook.svg";
import Link from 'next/link';
import trademark from "../../public/trademark.webp"

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <section className={styles.footerContainer}>
                <div className={`${styles.footerCards} grid grid-cols-1 sm:grid-cols-4`}>
                    <div className={styles.footerCard}>
                        <Image src={truck} height={64} width={64} alt={`🚛`} />
                        <div className={styles.content}>
                            <h3>
                                1 day Fast Delivery
                            </h3>
                            <h4>
                                terms and conditions applied
                            </h4>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <Image src={wallet} height={48} width={48} alt={`💵`} />
                        <div className={styles.content}>
                            <h3>
                                COD Available
                            </h3>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>
                            Have Queries or Concerns ?
                        </h3>
                        <div className={styles.content}>
                            <button>
                                CONTACT US
                            </button>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3 className={styles.underline}>
                            Follow us on
                        </h3>
                        <div className={`${styles.content} ${styles.socials}`}>
                            <Link href={`#`}>
                                <Image src={fb} width={30} height={30}/>
                            </Link>
                            <Link href={`#`}>
                                <Image src={insta} width={30} height={30}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`${styles.links} grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4`}>
                    <div className={styles.linkContainer}>
                        <h3>
                            Useful Links
                        </h3>
                        <ul>
                            <li>
                                <Link href={`#`}>Privacy policies</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Track Order</Link>
                            </li>
                            <li>
                                <Link href={`#`}>FAQs</Link>
                            </li>
                            <li>
                                <Link href={`#`}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainer}>
                        <h3>
                            Career
                        </h3>
                        <ul>
                            <li>
                                <Link href={`#`}>Privacy policies</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Track Order</Link>
                            </li>
                            <li>
                                <Link href={`#`}>FAQs</Link>
                            </li>
                            <li>
                                <Link href={`#`}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainer}>
                        <h3>
                            Categories
                        </h3>
                        <ul>
                            <li>
                                <Link href={`#`}>Privacy policies</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Track Order</Link>
                            </li>
                            <li>
                                <Link href={`#`}>FAQs</Link>
                            </li>
                            <li>
                                <Link href={`#`}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainer}>
                        <h3>
                            Let Us Help You
                        </h3>
                        <ul>
                            <li>
                                <Link href={`#`}>Privacy policies</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href={`#`}>Track Order</Link>
                            </li>
                            <li>
                                <Link href={`#`}>FAQs</Link>
                            </li>
                            <li>
                                <Link href={`#`}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.trademark}>
                        <Image src={trademark} width={150} height={60} alt='veganzo'/>
                    </div>
                </div>
                <div className={styles.copyright}>
                    © 2023-{new Date().getFullYear()} OBSTACKLE PVT. LTD. All rights are reserved.
                </div>
            </section>
        </footer>
    );
}