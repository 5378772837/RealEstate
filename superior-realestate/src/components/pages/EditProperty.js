import '../../css/pages/buy.css';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../../css/pages/addProperty.css"

function EditProperty(props) {
  
  const location = useLocation();
  const { property } = location.state;
  const[photo, setPhoto]=useState({id:0,imageLocation:"https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg"});
  const [editProperty, setEditProperty] = useState(0);
  let [photoNum, setPhotoNum] = useState(0);
  const [newPhoto, setNewPhoto]=useState();
  let [photoCount,setPhotoCount] = useState(0);
  const[responseProperty,setResponseProperty]=useState(0)
  const navigate = useNavigate();

  useEffect(() => {
  if(editProperty===responseProperty){
  setEditProperty(property);
  setPhotoCount(Object.keys(property.propertyPhotos).length)

  }else{
    setEditProperty(responseProperty);
    setPhotoCount(Object.keys(responseProperty.propertyPhotos).length)

  }
  displayPhoto()
  }, [responseProperty])

  useEffect(()=>{
  displayPhoto()
  },[photoCount])

  const displayPhoto = () => {
    try{
    setPhoto(editProperty.propertyPhotos[photoNum])
    }catch(e){setPhoto({id:0,imageLocation:"https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg"})}

  }

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempProperty = { ...property};
    tempProperty[name] = value;
    setEditProperty(tempProperty)
    }
    const photoChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempPhoto = { ...newPhoto};
        tempPhoto[name] = value;
        setNewPhoto(tempPhoto)
        }

    const nextPhotoClick = () =>{
        if(photoCount-1 !== photoNum){
          setPhotoNum(photoNum+1)
          setPhoto(editProperty.propertyPhotos[photoNum])
        }
        else{
          setPhotoNum(0)
          setPhoto(editProperty.propertyPhotos[photoNum])
          }
    }
    const prevPhotoClick = () =>{
       if(photoNum===0){
        setPhotoNum(photoCount-1)
        setPhoto(editProperty.propertyPhotos[photoNum])
      }else{
        setPhotoNum(photoNum-1)
        setPhoto(editProperty.propertyPhotos[photoNum])
      
      }

    }

    
    const deletePhotoClick = () =>{
        axios.delete(`http://localhost:8080/property/deletePhoto/${editProperty.id}/${photo.id}`)
        .then((response)=>{
          setResponseProperty(response.data)
          setPhotoNum(0)

        }).catch((e)=>{
          console.log(e)
        })
    }

    const addPhotoClick = (event) =>{
        event.preventDefault();
        axios.post(`http://localhost:8080/property/addPhoto/${editProperty.id}`,newPhoto)
        .then((response)=>{
          setResponseProperty(response.data)
          setPhotoNum(0)

        }).catch((e)=>{
          console.log(e)
        })

    }


  const handleUpdateClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/property/updateProperty", editProperty)
      .then((response) => {

        setResponseProperty(response.data);
        navigate("/Admin")
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
<div className='page'>
  <div className='picture-col'>
    <div className ='picture-row'>
     <img className = 'picture-box' src={photo.imageLocation} alt = {"photo.imageLocation"} />
    </div>
        <div className = 'buttons-row'>
          <button onClick={deletePhotoClick}>DELETE</button>
          <button onClick={nextPhotoClick}>NEXT</button>
          <button onClick={prevPhotoClick}>PREVIOUS</button>
        </div>
    </div>
    <div className='data-col'>
    <div className='content-row right'>
     Description
      <input  className = 'input-container center' value={editProperty.description} name='description' type='description' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    Bedrooms
      <input className = 'input-container center'  value={editProperty.bedrooms} name='bedrooms' type='bedrooms' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    Bathrooms
      <input className = 'input-container center'  value={editProperty.bathrooms} name='bathrooms' type='bathrooms' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    Acres
      <input className = 'input-container center'  value={editProperty.acres} name='acres' type='acres' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    Address
      <input className = 'input-container center'  value={editProperty.stAddress} name='stAddress' type='stAddress' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    City
      <input className = 'input-container center'  value={editProperty.city} name='city' type='city' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    State
      <input className = 'input-container center'  value={editProperty.state} name='state' type='state' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    Zip
      <input className = 'input-container center'  value={editProperty.zip} name='zip' type='Integer' onChange={changeHandler} ></input>
    </div>

    <div className='content-row right'>
    Price
      <input className = 'input-container center' value={editProperty.price} name='price' type='price' onChange={changeHandler} ></input>
    </div>
    <div className='content-row right'>
    ENTER: DATE ADDED: EX: 2023-12-03
      <input className = 'input-container center' value={editProperty.dateAdded} name='dateAdded' type='dateAdded' onChange={changeHandler} ></input>
    </div>
    <div>
        <button className= 'button center' onClick={handleUpdateClick}>UPDATE</button>
        </div>
        <div className='flex-row center'>
        ADD PHOTO URL:
        <input className = 'input-container' name='imageLocation' type='imageLocation' onChange={photoChangeHandler}></input>
        </div>
        <div>
        <button className= 'button center' onClick={addPhotoClick}>ADD PHOTO</button>
        </div>
        </div>
        </div>
  
      



  )
}

export default EditProperty;