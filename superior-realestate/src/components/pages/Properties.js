import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/pages/buy.css';
import { useNavigate } from 'react-router-dom';

function Properties (props) {

  const [selectedProperty, setSelectedProperty] = useState({id:0,description:"awaiting response"});
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

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


  const handleCitySearchChange = (event) => {
    setSearch(event.target.value);
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
  const handleStateSearchChange = (event) => {
    setSearch(event.target.value);
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

  const handlePriceSearchChange = (event) => {
      const tempSearch = { beginningPrice:"",endingPrice:""};
      const name = event.target.name;
      const value = event.target.value;
      tempSearch[name] = value;
      setSearch(tempSearch);
  }

  const handlePriceSearchSubmit = (event) => {
    event.preventDefault();
  
    axios
      .get(`http://localhost:8080/property/${search.beginningPrice}}/${search.endingPrice}`)
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
          Click To View Details
          <img src={propertyPhoto} alt={property.description} />
        </div>
      );
    });
  };


  return (
    <div className='buy-content'>
      <div className='flex-row search-row'>
        <input className='search-container center' type='city' value={search.city} onChange={handleCitySearchChange} placeholder='Search by City'/>
        <button className = 'search-button center' onClick={handleCitySearchSubmit}>Search</button>
        <input className='search-container center' type='state' value={search.state} onChange={handleStateSearchChange} placeholder='Search by State'/>
        <button className = 'search-button center' onClick={handleStateSearchSubmit}>Search</button>
        <input className='search-container center' type='Double' value={search.beginningPrice} onChange={handlePriceSearchChange} placeholder='Starting Price'/>
        <input className='search-container center' type='Double' value={search.endingPrice} onChange={handlePriceSearchChange} placeholder='Ending Price'/>
        <button className = 'search-button center' onClick={handlePriceSearchSubmit}>Search</button>
      </div>
      {showProperties()}
    
        </div>

  
      )}
   
    
      

export default Properties