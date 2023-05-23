package com.agency.service;

import java.util.List;
import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.entity.Property;
import com.agency.entity.User;
import com.agency.repo.PropertyRepo;
import com.agency.repo.UserRepo;

@Service
public class PropertyService {

	@Autowired
	PropertyRepo propertyRepo;
	
	@Autowired
	UserRepo userRepo;
	
	//SAVE METHOD
	public Property save(Property property) {

	    return propertyRepo.save(property);
	}
	
	//UPDATE METHOD
	public Property update(Property property) throws Exception {

        if(property.getId() != null) {
	        return propertyRepo.save(property);
        }

        throw new AccountNotFoundException("Property does not exist! id not present");
	}
    
	//FIND BY ID
    public Property findById(Integer propertyId) throws Error {

        if(propertyRepo.findById(propertyId).isPresent()) {
            return propertyRepo.findById(propertyId).get();
        }

        throw new Error("No property id present, Property not found");
        
    }

    //ALL PROPERTIES IN CITY
    public List<Property> findByCity(String city) throws Error {
        
        if(!propertyRepo.findByCity(city).isEmpty()) {
            return propertyRepo.findByCity(city);
        }
        

        throw new Error("No properties listed in that city, Property not found");
        
    }
    
    //ALL PROPERTIES IN A STATE
    public List<Property> findByState(String state) throws Error {
            
        if(!propertyRepo.findByState(state).isEmpty()) {
            return propertyRepo.findByState(state);
        }
        
        throw new Error("No properties listed in that State, Property not found");
        
    	}
    
    //ALL PROPERTIES IN A PRICE RANGE
    public List<Property> findByPrice(Double fromPrice, Double toPrice) throws Error {
      
   		if(!propertyRepo.findByPrice(fromPrice,toPrice).isEmpty()) {
   			return propertyRepo.findByPrice(fromPrice,toPrice);
   		}
        
   		throw new Error("No properties listed in that price range");
        
    	}
    
  //ALL PROPERTIES IN A BY SQUARE FT
    public List<Property> findBySqFt(Double fromSqFt, Double toSqFt) throws Error {
      
   		if(!propertyRepo.findByPrice(fromSqFt,toSqFt).isEmpty()) {
   			return propertyRepo.findByPrice(fromSqFt,toSqFt);
   		}
        
   		throw new Error("No properties listed in that square foot range");
        
    	}
    
    
    //A LIST OF ALL PROPERTIES
	public List<Property> findAll() {
		List<Property> properties = propertyRepo.findAll();
		for(Property p: properties) {
			p.setDiscount();
			p.getDiscount();
			}
		return properties;

	}
	
	public List<Property> findPropertiesInInventory() {
		List<Property> properties = propertyRepo.findPropertiesInInvetory();
		for(Property p: properties) {
			p.setDiscount();
			p.getDiscount();
			}
		return properties;

	}
	
	//DELETE A PROPERTY
    public void deleteById(Integer id) {
	    propertyRepo.deleteById(id);
	}


}
