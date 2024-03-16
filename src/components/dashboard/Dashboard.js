/*global google*/
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Button from "react-bootstrap/Button";
import Header from "../blocks/Header"



const GoogleMaps = (props) => {
  Geocode.setApiKey("AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI");
  Geocode.enableDebug();
  var str_replace = require("str_replace");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [mapPosition, setmapPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });
  const [markerPosition, setmarkerPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });
  // console.log("markerPosition",markerPosition);
  const [sort_address, setsort_address] = "";
  const [infoBoxVisible, setInfoBoxVisible] = useState(true);
  const [infoBoxContent, setInfoBoxContent] = useState("Welcome to India");
  const user_id = localStorage.getItem("user_id")
  const InfoBox = ({ show, lat, lng, content }) => {

    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          top: lat,
          left: lng,
          width: "100px",
        }}
      >
        {address}
      </div>
    );
  };

  // useEffect(()=>{
  //    if(!user_id){
  //      window.location.href = "/login"
  //    }
  // },[])

  var onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setmarkerPosition({ lat: newLat, lng: newLng });
    setmapPosition({ lat: newLat, lng: newLng })
  };
  const renderMarkers = (map, maps) => {
    // refereance : https://stackoverflow.com/questions/11390453/google-maps-drag-and-dragend-event-listeners-wont-work-if-marker-created-by-cli
    let marker = new maps.Marker({
      position: { lat: 22.2894694, lng: 70.7730229 },
      draggable: false,
      map,
      title: `${markerPosition.lat} ${markerPosition.lng}`,
    });
    marker.addListener("dragend", onMarkerDragEnd);

    return marker;
  };

  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const getcountry = (addressArray) => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  };

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  const getpostal_code = (addressArray) => {
    let postal_code = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "postal_code" === addressArray[i].types[0]
      ) {
        postal_code = addressArray[i].long_name;
        return postal_code;
      }
    }
  };

  const Geolocation = () => {
    Geocode.fromLatLng(markerPosition.lat, markerPosition.lng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray),
          country = getcountry(addressArray);
        setInfoBoxContent(area);
        // alert([...area]);
        // console.log(address.split(", ")[1] == city?"":"hiii");
        // console.log(city);

        setaddress(address ? address : "");
        setarea(area ? area : "");
        setcity(city ? city : "");
        setstate(state ? state : "");
        setcountry(country ? country : "");
      }
    );
    // alert(area)
  };

  const onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng(),
      country = getcountry(addressArray),
      postal_code = getpostal_code(addressArray);

    var ad = str_replace(city, "", address);
    ad = str_replace(state, "", ad);
    ad = str_replace(country, "", ad);
    ad = str_replace(postal_code, "", ad);
    ad = str_replace(",,,", "", ad);
    ad = str_replace(", ,  ,", "", ad);
    ad = str_replace(",  ,", "", ad);
    var sort_address = str_replace(", ,", "", ad);

    setaddress(address ? address : "");
    setarea(area ? area : "");
    setcity(city ? city : "");
    setstate(state ? state : "");
    setcountry(country ? country : "");
    setlatitude(latValue);
    setlongitude(lngValue);
    setpostal_code(postal_code);
    setsort_address(sort_address);
    setmarkerPosition({
      lat: latValue,
      lng: lngValue,
    });
    setmapPosition({
      lat: latValue,
      lng: lngValue,
    });
  };

  const onMarkerClick = () => {
    // Fetch address using reverse geocoding
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: { lat: markerPosition.lat, lng: markerPosition.lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            console.log("Address:", results[0].formatted_address);
            // Update the content of the InfoBox with the new address
            setInfoBoxContent(results[0].formatted_address);
          } else {
            console.log("Address not found");
            setInfoBoxContent("Address not found");
          }
        } else {
          console.log("Geocoder failed due to:", status);
          setInfoBoxContent("Geocoder failed");
        }
      }
    );

    // Toggle the visibility of the InfoBox when the marker is clicked
    setInfoBoxVisible(!infoBoxVisible);
  };

  const getMapOptions = (maps) => {

    return {
        streetViewControl: true,
        scaleControl: true,
        fullscreenControl: true,
        styles: [{
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }],
        gestureHandling: "greedy",
        disableDoubleClickZoom: true,

        mapTypeControl: true,
        mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: maps.ControlPosition.BOTTOM_CENTER,
            mapTypeIds: [
                maps.MapTypeId.ROADMAP,
                maps.MapTypeId.SATELLITE,
                maps.MapTypeId.HYBRID
            ]
        },

        zoomControl: true,
        clickableIcons: true
    };
}

  useEffect(() => {
    Geolocation();
  }, [markerPosition.lat, markerPosition.lng]);

  let map;
  if (props.lat !== undefined) {
    map = (
      <>
      <Header/>
      <div style={{ height: "80vh", width: "90%",margin:"auto" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI",
            }}
            defaultCenter={mapPosition}
            defaultZoom={16}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            options={getMapOptions}
          >
            {/* <InfoBox
              show={infoBoxVisible}
              lat={markerPosition.lat}
              lng={markerPosition.lng}
              content={address}
            /> */}
            <div>
            {/* <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              position:"relative",
              top:"150px",
              right:"30vw"
            }}
            onPlaceSelected={()=>onPlaceSelected()}
            types={["(regions)"]}
          /> */}
            </div>
          </GoogleMapReact>
        </div>
      </div>
      </>
    );
  }
  else {
    map = <div style={{ height: props.height }} />
  }
  return map
};

export default GoogleMaps;
