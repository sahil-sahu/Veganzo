import { useState } from "react";
import Image from 'next/image'
import styles from "./header.module.css"

export default function Header(){

    const [navbarOpen, setNavbarOpen] = useState(false);

    let style = null;

    if (navbarOpen){
        style = {
            transform: "translate(-50%,0%)",
        }
    }else {
        style = {
            transform: "translate(100%,0%)",
        }
    }

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
                <div className={styles.toggle} onClick={()=>{
                    if(navbarOpen){
                        setNavbarOpen(false);
                    }else{
                        setNavbarOpen(true);
                    }
                }}>
                    <div className={styles.upToggle} style={
                        (navbarOpen? {
                            transform: "translateY(300%) rotate(45deg)",
                        } : {transform: "unset",})
                    }></div>
                    <div className={styles.midToggle} style={
                        (navbarOpen? {
                            visibility: "hidden",
                        } : {visibility: "unset",})
                    }></div>
                    <div className={styles.downToggle} style={
                        (navbarOpen? {
                            transform: "translateY(-250%) rotate(-45deg)",
                        } : {transform: "unset",})
                    }></div>
                </div>
                <div className={styles.bottomBar} style={
                    (navbarOpen? {
                        top: 'calc(100vh)',
                    } : {top: 'calc(100vh - 2rem)',})
                }>
                    <ul>
                        <li><a href="">yo</a></li>
                        <li><a href="">bro</a></li>
                        <li><a href="">yup</a></li>
                    </ul>
                </div>
            </nav>
                <div className={styles.toggleContainer} style={style} onClick={()=>{
                    setNavbarOpen(false)
                }}>
                    <div className={styles.navItems}>
                        <ul>
                            <li><a href="">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">33</a></li>
                            <li><a href="">4</a></li>
                            <li><a href="">5</a></li>
                        </ul>
                    </div>
                    <div className={styles.socials}>
                    <ul>
                            <li><a href="">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">33</a></li>
                            <li><a href="">4</a></li>
                            <li><a href="">5</a></li>
                    </ul>
                    </div>
                </div>
        </header>
    )
}