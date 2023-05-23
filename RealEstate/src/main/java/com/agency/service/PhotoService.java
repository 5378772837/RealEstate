package com.agency.service;

import java.util.List;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.entity.Photo;
import com.agency.repo.PhotoRepo;

@Service
public class PhotoService {

	@Autowired
	PhotoRepo photoRepo;
	

	//SAVE METHOD
	public Photo save(Photo photo) {

	    return photoRepo.save(photo);
	}
	
	//UPDATE METHOD
	public Photo update(Photo photo) throws Exception {

        if(photo.getId() != null) {
	        return photoRepo.save(photo);
        }

        throw new AccountNotFoundException("Account does not exist! id not present");
	}
    
	//FIND BY ID
    public Photo findById(Integer photoId) throws Error {

        if(photoRepo.findById(photoId).isPresent()) {
            return photoRepo.findById(photoId).get();
        }

        throw new Error("Photo not found");
        
    }


	/*
	 * public List<Photo> findByPropertyId(Integer propertyID) throws Error {
	 * 
	 * if(!photoRepo.findByPropertyId(propertyID).isEmpty()) { return
	 * photoRepo.findByPropertyId(propertyID); }
	 * 
	 * 
	 * throw new Error("No Photos for that property");
	 * 
	 * }
	 */
    
    //A ALL PROPERTY IMAGES
	public List<Photo> findAll() {
		return photoRepo.findAll();
	}
	public List<Photo> findByPropertyId(Integer id) {
		return photoRepo.findByPropertyId(id);
	}
	
	//DELETE A PROPERTY
    public void deleteById(Integer id) {
	    photoRepo.deleteById(id);
	}

	
}
