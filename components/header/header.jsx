import { useState } from "react";
import Image from 'next/image'
import styles from "./header.module.css"

export default function Header(){

    const [navbarOpen, setNavbarOpen] = useState(false);

    return(
        <header className={styles.Navbar}>
            <nav>
                <div className={styles.brand}>
                    <a href="#">V<span>E</span>GANZO</a>
                </div>
                <div className={styles.navContent}>
                    <div className={styles.searchbar}></div>
                    <ul>
                        <li><a href="#">HOME</a></li>
                        <li><a href="#">ABOUT</a></li>
                        <li><a href="#">CATEGORY</a></li>
                        <li><a href="#">PARTNERS</a></li>
                        <li><a href="#">FEED</a></li>
                        <li><a href="#">CONTACT</a></li>
                    </ul>
                </div>
                <div className={styles.navactions}>
                    <ul>
                        <li><a href=""><Image width={25} height={25} src={"/header/wishlist.svg"} alt="❤️"></Image><span>WISHLIST</span></a></li>
                        <li><a href=""><Image width={25} height={25} src={"/header/cart.svg"} alt="❤️"></Image><span>CART</span></a></li>
                        <li><a href=""><Image width={25} height={25} src={"/header/profile.svg"} alt="❤️"></Image><span>PROFILE</span></a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}