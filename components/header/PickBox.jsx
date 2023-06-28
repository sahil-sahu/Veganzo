
import { useEffect, useState, useRef } from "react";
import styles from "./pickbox.module.css";
import { Radio, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import fetchAddress from "../accounts/helper";
import mapboxgl from "mapbox-gl"; 
import { addLocation } from "../../redux/cart";
import { Button } from "@material-tailwind/react";
import 'mapbox-gl/src/css/mapbox-gl.css';

function PickBox(props){

    const addresses = useSelector(state => state.authCheck.address);
    const auth = useSelector(state => state.authCheck.auth);
    const [customInput, openCustom] = useState(false);
    const [location, setLocation] = useState([]);
    const dispatch = useDispatch();

    const collect = async (e)=>{
        e.preventDefault();
        dispatch(addLocation(location));
          props.open(false);  
    }
    

    useEffect(()=>{
        if(addresses.length == 0 && auth){
          fetchAddress();
        }
      },[auth]);
    return (
        <>
            <div onClick={()=>props.open(false)}  className={styles.pickBox}></div>
            <div className={styles.pickContainer}>
                <h3>
                    Add Pickup Location
                </h3>
            <div className="flex flex-col gap-8">
                {
                    addresses.map((ele, i) => {
                        return(
                            <Radio 
                                key={ele.id}
                                name={`description`}
                                id={`address${ele.id}`}
                                onChange={()=>{
                                    openCustom(false);
                                    setLocation({
                                        lng: ele.location[0],
                                        lat: ele.location[1],
                                        name: '...fetching',
                                        set: true,
                                        id: ele.id,
                                      })
                                }}
                                label={
                                <div>
                                    <Typography color="teal" className="font-medium">{ele.name}</Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        {ele.address}
                                    </Typography>
                                </div>
                                }
                                containerProps={{
                                className: "-mt-5"
                                }}
                            />
                        );
                    })
                }
                <Radio 
                    name="description"
                    id="customLocation"
                    onChange={()=> openCustom(true)}
                    label={
                    <div>
                        <Typography color="teal" className="font-medium">Add Custom Location</Typography>
                        {customInput && <MapInput setLocation={setLocation} />}
                    </div>
                    }
                    containerProps={{
                    className: "-mt-5"
                    }}
                />
                </div>
                <Button onClick={collect} size="sm">Apply</Button>
            </div>
        </>
    );
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

function MapInput(props) {
    const setPickup = props.setLocation;
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [searchLoco, setSearch] = useState('');
    const [Lresults, setResults] = useState([]);

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
        if (lng == null) {
          getLocation();
          return;
        }
        map.current = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v9", // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          center: [lng, lat], // starting position
          zoom: 12, // starting zoom
        });
        const liveLocation = document.createElement("div");
        liveLocation.className = "liveLocation";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(liveLocation).setLngLat([lng, lat]).addTo(map.current);
        marker.current = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map.current);
        setPickup({
            lng ,
            lat,
            name: '...fetching',
            set: true,
            id: false,
          });
        function onDragEnd() {
          const lngLat = marker.current.getLngLat();
          setPickup({
            lng: lngLat.lng,
            lat: lngLat.lat,
            name: '...fetching',
            set: true,
            id: false,
          });
        }
        marker.current.on("dragend", onDragEnd);
      }, [lat,lng]);

    return <>
        {lng ? <div ref={mapContainer} className={styles.mapContainer} id="map">
                    <div className={styles.mapSearch}>
                        <input type="text" onChange={handleSearch} value={searchLoco} placeholder="Search Locality or pincode" />
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
        </>;
}

export default PickBox;