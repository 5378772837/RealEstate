import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/pages/buy.css';
import { useNavigate } from 'react-router-dom';

function Properties (props) {

  const [selectedProperty, setSelectedProperty] = useState();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState({city:"",state:"",sqFootStart:'',sqFootEnd:'',beginningPrice:'',endingPrice:''});

  useEffect(() => {

      axios
        .get('http://localhost:8080/property/findPropertiesInInventory')
        .then((response) => {
          setProperties(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);


  const handleSearchChange = (event) => {
    const name = event.target.name;
    console.log(name)
    const value = event.target.value;
    console.log(event.target.value)
    const tempSearch = { ...search};
    tempSearch[name] = value;
    setSearch(tempSearch);
  };

  const handleCitySearchSubmit = (event) => {
    event.preventDefault();
  
    axios
      .get(`http://localhost:8080/property/findPropertyByCity/${search.city}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStateSearchSubmit = (event) => {
    event.preventDefault();
  
    axios
      .get(`http://localhost:8080/property/findPropertyByState/${search.state}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handlePriceSearchSubmit = (event) => {
    event.preventDefault();
  
    axios
      .get(`http://localhost:8080/property/findByPrice/${search.beginningPrice}/${search.endingPrice}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSqFtSearchSubmit = (event) => {
    event.preventDefault();
  
    axios
      .get(`http://localhost:8080/property/findBySqFt/${search.sqFootStart}/${search.sqFootEnd}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePropertyClick = (property) => {
    navigate('/Property', { state: {property} });

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
          <div className='flex-row center'>{property.description}</div>
          <div className='flex-row center'>
          <img src={propertyPhoto} alt={property.description} />
          </div>
          <div className='flex-row center'>Beds:&nbsp;{property.bedrooms}&nbsp;Baths:&nbsp;{property.bathrooms}</div>
          <div className='flex-row center'>{property.stAddress}</div>
          <div className='flex-row center'>{property.city}, &nbsp; {property.state} &nbsp; {property.zip}</div>
          <div className='flex-row center'>${property.price}</div>

        </div>
      );
    });
  };


  return (
    <div className='buy-content scroll'>
      <div className='flex-row search-row'>
        <input className='search-container center' type="city" value={search.city} name='city' onChange={handleSearchChange} placeholder='Search by City'/>
        <button className = 'search-button center' onClick={handleCitySearchSubmit}>Search</button>
        <input className='search-container center' type="state" value={search.state} name='state'onChange={handleSearchChange} placeholder='Search by State'/>
        <button className = 'search-button center' onClick={handleStateSearchSubmit}>Search</button>
        <input className='search-container center' type="number" step={0.5} value={search.sqFootStart} name='sqFootStart'onChange={handleSearchChange} placeholder='Square Foot Start'/>
        <input className='search-container center' type="number" step={0.5} value={search.sqFootEnd} name='sqFootEnd' onChange={handleSearchChange} placeholder='Square Foot End'/>
        <button className = 'search-button center' onClick={handleSqFtSearchSubmit}>Search</button>
        <input className='search-container center' type="number" step={0.5} value={search.beginningPrice} name='beginningPrice'onChange={handleSearchChange} placeholder='Starting Price'/>
        <input className='search-container center' type="number" step={0.5} value={search.endingPrice} name='endingPrice' onChange={handleSearchChange} placeholder='Ending Price'/>
        <button className = 'search-button center' onClick={handlePriceSearchSubmit}>Search</button>
      </div>
      {showProperties()}
    
        </div>

  
      )}
   
    
      

export default Properties