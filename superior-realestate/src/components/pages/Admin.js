import React, { useState } from 'react'
import '../../css/pages/SignIn.css'
import '../../css/reusables/positions.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

import report from '../reusables/reportGenerator';
import '../../css/pages/admin.css'
import EditProperty from './EditProperty';

function Admin()  {

  const [reportDates, setReportDates] = useState({startDate: '', endDate: '' });
  const [propertySales, setPropertySales] = useState([]);
  const [properties, setProperties]=useState([]);
  const [search, setSearch]=useState([]);
  const [editProperty, setEditProperty] = useState(null);

  const navigator = useNavigate()

    const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempReportDates = { ...reportDates};
    tempReportDates[name] = value;

    setReportDates(tempReportDates)
    }
    
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
    };

  const reportSubmitHandler = () => {

    axios.get(`http://localhost:8080/property/findPropertiesSold/${reportDates.startDate}/${reportDates.endDate}`)
       .then((response) => {
        console.log("response data", response.data)
        report(response.data);
       })
    

       .catch ((e) => {
        console.log('error');
       })
    };


const addPropertiesSubmitHandler=() =>{
  navigator('/AddProperty');
}


    const findAllSubmitHandler=() => {

      try {
        axios.get('http://localhost:8080/property/findPropertiesInInventory')
        .then((response) => {
          console.log("response data", response.data)
          setProperties(response.data);}
        )}
       catch(err) {
          console.log('error');
       }
  
    };
    const handleSearchSubmit = (event) => {
      event.preventDefault();
    
      axios
        .get(`http://localhost:8080/property/findPropertyByCity/${search}`)
        .then((response) => {
          setProperties(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handlePropertyClick = (property) => {
      
      navigator('/EditProperty', { state: {property} });
    };
  


    const showProperties = () => {
      return properties.map((property) => {
        const propertyPhoto = property.propertyPhotos && property.propertyPhotos.length > 0 ? property.propertyPhotos[0].imageLocation : '';
        return (
          <div
            className='property-box'
            key={property.id}
            onClick={() => handlePropertyClick(property)}
          >
            Click To Edit:
          <div className='flex-row center'>{property.description}</div>
          <div className='flex-row center'>
          <img src={propertyPhoto} alt={property.description} />
          </div>
          <div className='flex-row center'>Beds:&nbsp;{property.bedrooms}&nbsp;Baths:&nbsp;{property.bathrooms}sqFt:{property.sqFoot}</div>
          <div className='flex-row center'>{property.stAddress}</div>
          <div className='flex-row center'>{property.city}, &nbsp; {property.state} &nbsp; {property.zip}</div>
          <div className='flex-row center'>${property.price}</div>
          </div>
        );
      });
    };
    
  

    return (
            <div className= 'fill'>
            <div className='admin-sidebar justify-content-center'>
                    <h3>Hello Agent</h3>
                    <h2>Run Sales Report</h2>
                    Report Start Date
                    <input className='sidebar-input-container'  value={reportDates.startDate} name='startDate' type='startDate' onChange={changeHandler} required></input>
                    Report End Date
                    <input className='sidebar-input-container' value={reportDates.endDate} name='endDate' type='endDate' onChange={changeHandler} required></input>
                    <button className="button" onClick={reportSubmitHandler}>GET REPORT</button>
                    <h2>EDIT PROPERTY</h2>
                    <h3>FIND ALL</h3>
                    <button className="button" onClick={findAllSubmitHandler}>FIND ALL PROPERTIES</button>
                    <h2>ADD PROPERTY</h2>
                    <button className="button" onClick={addPropertiesSubmitHandler}>ADD NEW PROPERTY</button>
                    <h2>FIND BY CITY</h2>
                    <input className='sidebar-input-container'  value={search} name='model' type='model' onChange={handleSearchChange} required></input>
                    <button className="button" onClick={handleSearchSubmit}>FIND BY CITY</button>
            </div>
            <div className = 'property-disp-col scroll'>
                {showProperties()}
                
                      </div>
            </div>         
 
  
   )
}



export default Admin