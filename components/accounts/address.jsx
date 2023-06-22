import { useState } from 'react';
import styles from './address.module.css';
export default function Address(props){
    const [edit,setEdit] =useState(false);
    const [editAddress,setEditAddress] =useState(props.load.address);
    const [editName,setEditName] =useState(props.load.name);
    const [editPhone,setEditPhone] =useState(props.load.phone);
    return(
        <li className={styles.location}>
            <input type="radio" name="" id="" />
            <p>
                Name: {props.load.name} <br />
                Phone: {props.load.phone} <br />
                {props.load.address}
            </p>
            <svg onClick={()=>setEdit(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            {
                edit && <div className={styles.editBox}>
                <div className={styles.editContainer}>
                        <input type="text" onChange={e=>setEditName(e.target.value)} value={editName} placeholder="Name" />
                        <input type="number" placeholder="Phone" value={editPhone} onChange={e=>{e.target.value.length<11?setEditPhone(e.target.value):{};}} />
                        <textarea id="noter-text-area" name="textarea" onChange={e=> setEditAddress(e.target.value)}>{editAddress}</textarea>
                    <br />
                    <button>Save</button>
                </div>
            </div>
                                    
            }
        </li>
    );
}