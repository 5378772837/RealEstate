package com.agency.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.agency.entity.User;
import com.agency.entity.Property;
import com.agency.repo.PropertyRepo;
import com.agency.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    
    @Autowired
    PropertyRepo propertyRepo;
	
	public User save(User user) {
		System.out.println("You hit user save Service homie");
	    return userRepo.save(user);
	}
	
	public User update(User user) throws Exception {	
        if(user.getId() != null) {
	        return userRepo.save(user);
        }
        throw new AccountNotFoundException("Account does not exist! id not present");
	}
    
    public User findById(Integer userId) throws Error {

        if(userRepo.findById(userId).isPresent()) {
            return userRepo.findById(userId).get();
        }
        
        throw new Error("No user id present, User not found");
        
    }

	public User findByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	public List<User> findAll() {
		return userRepo.findAll();
	}

	
	  public User signIn(User user) throws Exception {
	  
	  User loggedInUser = userRepo.findByEmail(user.getEmail());
	  if(loggedInUser == null) { 
		  throw new Exception("User was not found");
	  }else if(!loggedInUser.getPassword().equals(user.getPassword())) {
		  throw new Exception("Incorrect Password");
	  }
	  return loggedInUser;
	  
	  }
	 

    public void deleteById(Integer id) {
	    userRepo.deleteById(id);
	}

	public Property addPropertyToUser(Property property,String email) {
		
		property.setSold(true);
		property.setDateSold(LocalDate.now());
		propertyRepo.save(property);
		User user = userRepo.findByEmail(email);
		user.addProperty(property);
		userRepo.save(user);
		return property;

	}
	
	public Property addListingToUser(String email, Property listing) {
		
		listing.setSold(false);
		propertyRepo.save(listing);
		User user = userRepo.findByEmail(email);
		user.addListing(listing);
		userRepo.save(user);
		return listing;

	}

}
