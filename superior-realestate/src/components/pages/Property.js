import '../../css/pages/buy.css';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../../css/pages/addProperty.css"

function Property(props) {
  
  const location = useLocation();
  const { property } = location.state;
  const[photo, setPhoto]=useState({id:0,imageLocation:"https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg"});
  const [selectedProperty, setSelectedProperty] = useState([]);
  let [photoNum, setPhotoNum] = useState(0);
  let [photoCount,setPhotoCount] = useState(0);
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState("This House is Still For Sale!");

  useEffect(() => {
  console.log(property)
  setSelectedProperty(property);
  setPhotoCount(Object.keys(property.propertyPhotos).length)
  displayPhoto()
  }, [photoCount])

  const displayPhoto = () => {
    try{
    setPhoto(selectedProperty.propertyPhotos[photoNum])
    }catch(e){setPhoto({id:0,imageLocation:"https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg"})}

  }

 
    const nextPhotoClick = () =>{
        if(photoCount-1 !== photoNum){
          setPhotoNum(photoNum+1)
          setPhoto(selectedProperty.propertyPhotos[photoNum])
        }
        else{
          setPhotoNum(0)
          setPhoto(selectedProperty.propertyPhotos[photoNum])
          }
    }
    const prevPhotoClick = () =>{
       if(photoNum===0){
        setPhotoNum(photoCount-1)
        setPhoto(selectedProperty.propertyPhotos[photoNum])
      }else{
        setPhotoNum(photoNum-1)
        setPhoto(selectedProperty.propertyPhotos[photoNum])
      
      }

    }
const handleBuySubmit = () =>{
  console.log(props.user.email)
  if(props.user.email === ""){
    setDisplayMessage("You MUST be Logged In to Purchase A Home")
    }else if(selectedProperty.isSold === true || selectedProperty.sold ===true){
    setDisplayMessage("This house is no longer for sale")
    }else{
    try{
    axios.post(`http://localhost:8080/property/Purchase/${props.user.email}`,selectedProperty)
    .then((response)=>{
      setPhotoNum(0)
      setSelectedProperty(response.data)
      setDisplayMessage("CONGRATS ON YOUR NEW HOME")
    })}catch(e){
      console.log(e)
    }
  }
}


  

  return (
<div className='fill'>
  <div className='picture-col'>
    <div className ='picture-row center'>
     <img className = 'picture-box center' src={photo.imageLocation} alt = {"photo.imageLocation"} />
    </div>
        <div className = 'buttons-row'>
          <button className='button center'onClick={nextPhotoClick}>NEXT</button>
          <button className='button center'onClick={prevPhotoClick}>PREVIOUS</button>
        </div>
    </div>
    <div className='data-col'>
    <div className='content-row center'>
    <b>Description:&nbsp;</b>{selectedProperty.description}
    </div>
    <div className='content-row center'>
    <b>Bedrooms: &nbsp;</b>{selectedProperty.bedrooms}
    </div>
    <div className='content-row center'>
    <b>Bathrooms: &nbsp;</b>{selectedProperty.bathrooms}
    </div>
    <div className='content-row center'>
    <b>Square Ft: &nbsp; </b> {selectedProperty.sqFoot}
    </div>
    <div className='content-row center'>
    <b>Acres: &nbsp;</b>{selectedProperty.acres}
    </div>
    <div className='content-row center'>
    <b>Address: &nbsp;</b>{selectedProperty.stAddress}
    </div>
    <div className='content-row center'>
    <b>City: &nbsp;</b>{selectedProperty.city}
    </div>
    <div className='content-row center'>
    <b>State: &nbsp;</b>{selectedProperty.state}
    </div>
    <div className='content-row center'>
    <b>Zip: &nbsp; </b>{selectedProperty.zip}
    </div>

    <div className='content-row center'>
    <b>Price: &nbsp; </b>{selectedProperty.price}
    </div>
    <div className='content-row center'>
    <b>DATE ADDED: &nbsp;</b>{selectedProperty.listDate}
    </div>
    <div className='content-row center'>
    <h3>{displayMessage} &nbsp;</h3>
    </div>
    <div className='content-row center'>
    <button className="button center" onClick={handleBuySubmit}>PURCHASE PROPERTY</button>
        </div>
        </div>
        </div>
  
      



  )
}

export default Property;