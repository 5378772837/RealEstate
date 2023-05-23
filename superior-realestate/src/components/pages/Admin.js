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
            Click To Edit Property
            <img src={propertyPhoto} alt={property.desc} />
          </div>
        );
      });
    };
    
  

    return (
            <div className= 'fill'>
            <div className='admin-sidebar justify-content-center'>
                    <h2>Hello Agent</h2>
                    <h1>Run Sales Report</h1>
                    Report Start Date
                    <input className='sidebar-input-container'  value={reportDates.startDate} name='startDate' type='startDate' onChange={changeHandler} required></input>
                    Report End Date
                    <input className='sidebar-input-container' value={reportDates.endDate} name='endDate' type='endDate' onChange={changeHandler} required></input>
                    <button onClick={reportSubmitHandler}>GET REPORT</button>
                    <h1>EDIT PROPERTY</h1>
                    <h2>FIND ALL</h2>
                    <button onClick={findAllSubmitHandler}>FIND ALL PROPERTIES</button>
                    <h1>ADD PROPERTY</h1>
                    <button onClick={addPropertiesSubmitHandler}>ADD NEW PROPERTY</button>
                    <h2>FIND BY CITY</h2>
                    <input className='sidebar-input-container'  value={search} name='model' type='model' onChange={handleSearchChange} required></input>
                    <button onClick={handleSearchSubmit}>FIND BY CITY</button>
            </div>
            <div className = 'property-disp-col fill'>
                {showProperties()}
                
                      </div>
            </div>         
 
  
   )
}



export default Admin