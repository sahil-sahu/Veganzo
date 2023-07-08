import { NextSeo } from 'next-seo';
import Header from '../../components/header/header';

import styles from '../../components/accounts/address.module.css'
import Address from '../../components/accounts/address';

import EditAddress from '../../components/accounts/editAddress';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchAddress from '../../components/accounts/helper';

export default function Home() {
  const [add ,setAdd] = useState(false);
  const addresses = useSelector(state => state.authCheck.address);
  const auth = useSelector(state => state.authCheck.auth);

  const newAddress = () => {
    setAdd(true);
  }

  useEffect(()=>{
    if(addresses.length == 0 && auth){
      fetchAddress();
    }
  },[auth]);

  return (
    <>
      <NextSeo
          title="Veganzo"
          description=""
        />
      <Header></Header>
      <main id="main">
        <div className={styles.address}>
          <div className={styles.addressContainer}>
            <h2>
              List of Addresses
            </h2>
            <span title='Add New Address' onClick={newAddress} className={styles.pushAddress}>+</span>
            {
              add && <EditAddress open={setAdd} load={{
                name: ``,
                phone: ``,
                address: ``,
                location: null,
                id: new Date().getTime(),
              }} />
            }
            <ul>
              {addresses.map(address => {
                return <Address load={address} />
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
