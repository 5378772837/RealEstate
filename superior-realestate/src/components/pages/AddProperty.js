import '../../css/pages/addProperty.css';
import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProperty(props) {

  const [newProperty, setNewProperty] = useState({description:"",bedrooms:0,bathrooms:0,acres:0.0,stAddress:"",city:"",state:"",zip: 0, price:0.0, dateAdded: ""}) 
  const navigate = useNavigate();
  const [photo, setPhoto]=useState({imageLocation:"https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg"})
  const [photoNum, setPhotoNum]=useState(0)
  let [photoCount,setPhotoCount] = useState(0);

  const addPropertyChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempNewProperty = { ...newProperty};
    tempNewProperty[name] = value;
    setNewProperty(tempNewProperty);
};
const photoChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  const tempPhoto = { ...photo};
  tempPhoto[name] = value;
  setPhoto(tempPhoto)
  }

  const handleAddPropertySubmit = (event) => {
    event.preventDefault();
    console.log(props.user.id)
    console.log(newProperty)
  
    axios
      .post(`http://localhost:8080/property/AddProperty/${props.user.email}`, newProperty)
      .then((response) => {
      setNewProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const addPhotoClick = (event) =>{
    event.preventDefault();
    axios.post(`http://localhost:8080/property/addPhoto/${newProperty.id}`,photo)
    .then((response)=>{
      setNewProperty(response.data)
      setPhotoCount(photoCount+1)
      setPhotoNum(0)

    }).catch((e)=>{
      console.log(e)
    })

}
const deletePhotoClick = () =>{
  axios.delete(`http://localhost:8080/property/deletePhoto/${newProperty.id}/${photo.id}`)
  .then((response)=>{
    setPhotoNum(0)

  }).catch((e)=>{
    console.log(e)
  })
}

const nextPhotoClick = () =>{
  if(photoCount-1 !== photoNum){
    setPhotoNum(photoNum+1)
    setPhoto(newProperty.propertyPhotos[photoNum])
  }
  else{
    setPhotoNum(0)
    setPhoto(newProperty.propertyPhotos[photoNum])
    }
}
const prevPhotoClick = () =>{
 if(photoNum===0){
  setPhotoNum(photoCount-1)
  setPhoto(newProperty.propertyPhotos[photoNum])
}else{
  setPhotoNum(photoNum-1)
  setPhoto(newProperty.propertyPhotos[photoNum])

}

}


  return(
  <div className='page'>
  <div className='picture-col'>
    <div className ='picture-row center'>
     <img className = 'picture-box' src={photo.imageLocation} alt = {"photo.imageLocation"} />
    </div>
        <div className = 'buttons-row'>
          <button onClick={deletePhotoClick}>DELETE</button>
          <button onClick={nextPhotoClick}>NEXT</button>
          <button onClick={prevPhotoClick}>PREVIOUS</button>
        </div>
    </div>
    <div  className='data-col'>
    <div className='content-row right'>
     Description
      <input  className = 'input-container center' value={newProperty.description} name='description' type='description' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Bedrooms
      <input className = 'input-container center'  value={newProperty.bedrooms} name='bedrooms' type="number" onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Bathrooms
      <input className = 'input-container center'  value={newProperty.bathrooms} name='bathrooms' type="number" step={0.5} onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Square Ft
    <input className = 'input-container center'  value={newProperty.sqFoot} name='sqFoot' type="number" step={0.5} onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Acres
      <input className = 'input-container center'  value={newProperty.acres} name='acres' type="number" step={0.01} onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Address
      <input className = 'input-container center'  value={newProperty.stAddress} name='stAddress' type='stAddress' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    City
      <input className = 'input-container center'  value={newProperty.city} name='city' type='city' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    State
      <input className = 'input-container center'  value={newProperty.state} name='state' type='state' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    Zip
      <input className = 'input-container center'  value={newProperty.zip} name='zip' type="number" onChange={addPropertyChangeHandler} ></input>
    </div>

    <div className='content-row right'>
    Price
      <input className = 'input-container center' value={newProperty.price} name='price' type="number" step={0.01} onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='content-row right'>
    ENTER: DATE ADDED: EX: 2023-12-03
      <input className = 'input-container center' value={newProperty.listDate} name='listDate' type="date" onChange={addPropertyChangeHandler} ></input>
    </div>
    <div className='buttons-row center'>
      <button className='button center' onClick={handleAddPropertySubmit}>SUBMIT</button>
    </div>
    <div className='content-row right'>
    <div classname='flex-row'>Photo URL</div>
        <input className = 'input-container center' value={photo.imageLocation} name='imageLocation' type="url" onChange={photoChangeHandler}></input>
      </div>
      <div className='buttons-row center'>
        <button className='button center' onClick={addPhotoClick}>Add Photo</button>
      </div>
      </div>
      </div>

  )



}

export default AddProperty;