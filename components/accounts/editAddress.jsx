import styles from './address.module.css';
import { useEffect, useState, useRef } from 'react';
import mapboxgl from "mapbox-gl"; 
import { database } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import fetchAddress from './helper';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

export default function EditAddress(props){
    const [editName,setEditName] =useState(props.load.name);
    const [editPhone,setEditPhone] =useState(props.load.phone);
    const [editAddress,setEditAddress] =useState(props.load.address);
    const [pickup, setPickup] = useState(props.load.location);
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const id = useSelector(state => state.authCheck.id);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [searchLoco, setSearch] = useState('');
    const [Lresults, setResults] = useState([]);


    //Submitting to firestore
    const setNewAddress = async (e) =>{
        e.preventDefault();
        await setDoc(doc(database, `users/${id}/address`, `${props.load.id}`),{
            name: editName,
            phone: editPhone,
            address: editAddress,
            lng: pickup[0],
            lat: pickup[1],
        })
        fetchAddress();
        props.open(false);
    }

    // Mapping Stuff
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
  
    function showPosition(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }

    function setPosition(lat, lng){
        map.current.setCenter([lng,lat]);
        marker.current.setLngLat([lng,lat]);
        setResults([]);
    }

    async function handleSearch(e){
        setSearch(e.target.value);
        let search = e.target.value;
        let results = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=${lng},${lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`)
        let jsonify = await results.json();
        setResults(jsonify.features)
    }

    useEffect(() => {
        if (lng == null && !pickup) {
          getLocation();
          return;
        } else if (pickup){
          setLat(pickup[1]);
          setLng(pickup[0]);
          setPickup(null);
          return;
        }
        setPickup([lng, lat]);
        map.current = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v9", // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          center: [lng, lat], // starting position
          zoom: 12, // starting zoom
        });
        const liveLocation = document.createElement("div");
        liveLocation.className = "liveLocation";

        // const searchJS = document.getElementById('search-js');
        // const searchBox = new MapboxSearchBox();
        // searchBox.options = {
        //     language: 'en',
        //     country: 'US',
        //     };
        // searchBox.accessToken = process.env.NEXT_PUBLIC_MAPBOX;
        // map.addControl(searchBox);
    
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(liveLocation).setLngLat([lng, lat]).addTo(map.current);
        marker.current = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map.current);
        function onDragEnd() {
          // alert(e);
          const lngLat = marker.current.getLngLat();
          setPickup([lngLat.lng, lngLat.lat]);
        }
        marker.current.on("dragend", onDragEnd);
      }, [lat,lng]);

    return(
        <>
        <div onClick={()=>props.open(false)} className={styles.editBox}></div>
        <form onSubmit={(e)=> e.preventDefault()} className={styles.editContainer}>
                <input type="text" onChange={e=>setEditName(e.target.value)} value={editName} placeholder="Name" />
                <input type="number" placeholder="Phone" value={editPhone} onChange={e=>{e.target.value.length<12?setEditPhone(e.target.value):{};}} />
                <textarea id="noter-text-area" placeholder='Add Address' name="textarea" value={editAddress} onChange={e=> setEditAddress(e.target.value)}></textarea>
                {lng ? <div ref={mapContainer} className={styles.mapContainer} id="map">
                    <div className={styles.mapSearch}>
                        <input type="text" onChange={handleSearch} value={searchLoco} placeholder="Search Location" />
                        <ul>
                            {
                                Lresults.map((result,i) => (
                                    <li key={i}  onClick={()=>{
                                        setPosition(result.center[1],result.center[0])
                                    }} >{result.place_name}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        map.current.setCenter([lng,lat]);
                        marker.current.setLngLat([lng,lat]);
                    }} className={styles.relocate}>
                    </button>
                </div> : `loading...`}
            <br />
            <br />
            <button onClick={setNewAddress} className={styles.addSubm}>Save</button>
        </form>
        </>
    );
}