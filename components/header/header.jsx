import { useState } from "react";
import Image from 'next/image'
import { useEffect, useRef } from "react";
import styles from "./header.module.css"
import { typesense } from "../../typesense/config";
import { auth, database } from "../../firebase/config";
import Link from "next/link";
import {useRouter} from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { load }from  '../../redux/fireAuth';
import OtpInput from 'react-otp-input';
import { signInWithCredential, linkWithCredential, OAuthProvider } from "firebase/auth";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { async } from '@firebase/util';
import {
    getDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
  }
export default function Header(props){

    const [interimTranscript, setInterimTranscript] = useState('');
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [suggestion, setSuggestion] = useState(false);
    const [animate, setAnimate] = useState('');
    const [search, setSearch] = useState(props.q? props.q: '');
    const [profile, setProfile] = useState(false);
    const [phone, setPhone] = useState(``);
    const [otp, setOtp] = useState([false,``]);
    const router = useRouter();
    const login = useSelector(state => state.authCheck);
    const cartCount = useSelector(state => state.cart.cart.length);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState();
    const [status, setStatus] = useState(STATUS.STOPPED)
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

    useInterval(
        () => {
          if (counter > 0) {
            setCounter(counter - 1)
          } else {
            // setStatus(STATUS.STOPPED)
          }
        },
        status === STATUS.STARTED ? 1000 : null,
        // passing null stops the interval
      )

    async function resend(){
        if(counter === 0){
            // window.recaptchaVerifier = null;
            // phoneAuth();

            let widgetId = await window.recaptchaVerifier.render();
            await grecaptcha.reset(widgetId);
            signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier).then((confirmationResult) => {

                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                  console.log(error);
            });
            }
    }

    const profileBox = <>
            <div className={styles.account}>
                <h4>
                {login.name != ''? `Hi! ${login.name}`: `Hi! there`} 
                </h4>
            </div>
            <Link href={'/account/orders'} className={styles.dropItem}>
                <Image className={styles.toggle1} width={30} height={30} src={'/icons/system-solid-64-shopping-bag (1).svg'}></Image>
                <Image className={styles.toggle0} width={30} height={30} src={'/icons/system-solid-64-shopping-bag.webp'}></Image>
                My Orders
            </Link>
            <Link href={'/account/'} className={styles.profileI}>
                <Image className={styles.toggle1} width={30} height={30} src={'/icons/profileI.svg'}></Image>
                <Image className={styles.toggle0} width={30} height={30} src={'/icons/system-solid-8-account (2).webp'}></Image>
                Profile
            </Link>
            <Link href={'/account/addresses'} className={styles.dropItem}>
                <Image className={styles.toggle1} width={30} height={30} src={'/icons/system-solid-41-home.svg'}></Image>
                <Image className={styles.toggle0} width={30} height={30} src={'/icons/system-solid-41-home.webp'}></Image>
                Address
            </Link>
            <a onClick={logout} className={styles.dropItem}>
                Logout
            </a>
            </>
    
    function otpValidator(otp){

        if (!isNaN(otp)){
            setOtp([true,otp]);
        }

    }
    function logout(){
            signOut(auth).then(() => {
                dispatch(load({
                    auth: false,
                    name: '',
                    email: '',
                  }))
                  // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
    }

    const makeUser = async id => {

        const docref = doc(database, 'users', id);
        const docSnap = await getDoc(docref);
        if (!docSnap.exists()){

            await setDoc(docref, {
                name: '',
                phone,
                email: '',
            });
        }

    }

    async function submitit(event){

        event.preventDefault();
        // makeUser(id)
        if(otp[0]===true){
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp[1]).then(async (result) => {
              // User signed in successfully.
                const user = result.user;
                const id = user.reloadUserInfo.localId; 
                setProfile(false);
                await makeUser(id);

                
                
            }).catch((error) => {
                console.log(error);
            });
            return;
        }

        if(phone.length == 10){
            await phoneAuth();
            setOtp([true,``]);
        }

    }
    const recaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier( styles.captcha , {
            'size': 'invisible',
            'callback': (response) => {
            }
          }, auth);
    }
    function phoneAuth(){

        recaptcha();
        setCounter(30);
        setStatus(STATUS.STARTED);
        let appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, `+91${phone}`, appVerifier).then((confirmationResult) => {

                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                  console.log(error);
            });
      }
    
    async function loadSuggestions(e){
        setSearch(e.target.value);
        if(e.target.value==""){
            setSuggestion(false);
            return;
        }
        let data = await typesense.collections('inventory').documents().search({
            'q'         : e.target.value,
            'query_by'  : 'name, type',
          })
        setSuggestion([...data.hits.map((e)=>{
            return { id : e.document.id, name: e.document.name, img:e.document.cover }
          })]) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/s?q=${search}`)
    }

    const handleSpeechRecognition = () => {
        const recognition = new window.webkitSpeechRecognition();
        setAnimate('micOn');
        setSearch('');
    
        // Set recognition parameters
        recognition.continuous = true;
        recognition.interimResults = true;
    
        recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
    
          // Loop through the result's alternatives
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
    
            // Check if the result is final or interim
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
              setSearch(finalTranscript);
              setAnimate('') ;
              recognition.stop();
              router.push(`/s?q=${finalTranscript}`)
            } else {
              interimTranscript += transcript;
            }
          }
    
          // Update the transcripts
          setInterimTranscript(interimTranscript);
        };
    
        recognition.onerror = (event) => {
          window.alert('Please Try');
        };
    
        recognition.onend = () => {
          console.log('Speech recognition ended');
        };
    
        recognition.start();
      };

    return(
        <header className={styles.Navbar}>
            <nav>
                <div className={styles.brand}>
                    <Link href={'/'}>V<span>E</span>GANZO</Link>
                </div>
                <div className={styles.navContent}>
                    <div className={styles.searchbar}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <form onSubmit={handleSubmit} method="get">
                        <input placeholder={interimTranscript!= ''? interimTranscript:"Super Shake"} value={search} type="search" onChange={loadSuggestions} onBlur={()=> {
                            setTimeout(()=> {setSuggestion(false)},200)
                        }}/>
                        </form>
                        <svg onClick={handleSpeechRecognition} id={animate} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" cursor={'pointer'} viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
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
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="#">ABOUT</Link></li>
                        <li><Link href="#">CATEGORY</Link></li>
                        <li><Link href="#">PARTNERS</Link></li>
                        <li><Link href="#">FEED</Link></li>
                        <li><Link href="#">CONTACT</Link></li>
                    </ul>
                </div>
                <div className={styles.navactions}>
                    <ul>
                        <li><Link className={styles.cart} href="/checkout"><Image width={25} height={25} src={"/header/cart.svg"} alt="❤️" /><span>CART</span>{cartCount>0 && <span className={styles.cartCounter}>{cartCount}</span>}</Link></li>
                        <li onClick={()=> setProfile(true)}  className={styles.profile}><Image width={25} height={25} src={"/header/profile.svg"} alt="❤️"></Image><span>{login.auth?`PROFILE`: `SIGN IN`}</span></li>
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
            {profile && <><div onClick={(e)=> {setProfile(false)}} className={styles.profileIContain}></div>
                <div  className={styles.proFileDropdown}>
                    {
                        login.auth? profileBox : <>
                            <div className={styles.greeting}>
                                <div className={styles.signIn}>
                                    Sign In
                                </div>
                                <p>
                                    Get started with Veganzo🔥
                                </p>
                            </div>
                            <form onSubmit={submitit} className={styles.signIn}>
                            <label><span>*</span> Enter your Phone Number</label>
                            <div className={styles.inputBox}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                                    </svg>
                                    <p>+91</p>
                                </div>
                                <input name="phone" placeholder="Mobile number" type="number" value={phone} onChange={(e) => {
                                    if (e.target.value.length<11) {
                                        setPhone(e.target.value);
                                    }
                                }} />
                            </div>
                            {otp[0] && <>
                                                <label>Enter OTP</label>
                                                <OtpInput
                                                    value={otp[1]}
                                                    onChange={otpValidator}
                                                    numInputs={6}
                                                    shouldAutoFocus={true}
                                                    renderInput={(props) => <div className={styles.OtpIp} style={{
                                                        margin: '3px',
                                                        borderBottom: '#afafaf 1px solid',
                                                        outline: 'none',
                                                    }}><input {...props} /></div>}
                                                />
                                                <p className={`${styles.counter} ${counter==0? '': styles.disable}`} onClick={resend}>resend otp {counter == 0? '':`in ${counter}s`}</p>
                                            </>}
                            <button className={styles.submit} variant="primary" type="submit">
                                {otp[0]? `Submit` : `Get OTP`}
                            </button>
                            </form>
                            </>
                        
                    }
                </div>
            </>    
            }
        <div id={styles.captcha} className={styles.captcha}></div>       
        </header>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }