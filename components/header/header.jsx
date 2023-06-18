import { useState } from "react";
import Image from 'next/image'
import { useEffect } from "react";
import styles from "./header.module.css"
import { typesense } from "../../typesense/config";
import Link from "next/link";
import {useRouter} from 'next/router'

export default function Header(props){

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [suggestion, setSuggestion] = useState(false);
    const [search, setSearch] = useState();
    const router = useRouter();

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

    async function loadSuggestions(e){
        setSearch(e.target.value);
        if(e.target.value==""){
            setSuggestion(false);
            return;
        }
        let data = await typesense.collections('inventory').documents().search({
            'q'         : e.target.value,
            'query_by'  : 'name',
          })
        setSuggestion([...data.hits.map((e)=>{
            return { id : e.document.id, name: e.document.name, img:e.document.cover }
          })]) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/s?q=${search}`)
    }

    return(
        <header className={styles.Navbar}>
            <nav>
                <div className={styles.brand}>
                    <a href="#">V<span>E</span>GANZO</a>
                </div>
                <div className={styles.navContent}>
                    <div className={styles.searchbar}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <form onSubmit={handleSubmit} method="get">
                        <input placeholder="Super Shake" value={search} type="search" onChange={loadSuggestions} onBlur={()=> {
                            // setTimeout(()=> {setSuggestion(false)},200)
                        }}/>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>

                        {suggestion && <ul className={styles.suggestion}>
                        {
                            suggestion.map(ele =>{
                                return(
                                    <li key={ele.id}>
                                        <Link href={`/s?q=${ele.name}`}>
                                            <Image src={ele.img} width={48} height={48} alt={ele.name} />
                                            <p>{ele.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        </ul>}
                    </div>
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