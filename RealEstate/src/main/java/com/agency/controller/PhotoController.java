package com.agency.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.agency.entity.Photo;
import com.agency.entity.Property;
import com.agency.service.PhotoService;
import com.agency.service.PropertyService;

@RestController
@RequestMapping(value="/photo")
@CrossOrigin("*")

public class PhotoController {
	
	@Autowired
	PhotoService photoService;

	@Autowired
	PropertyService propertyService;
	
	@RequestMapping(
	  		value = "/save/{id}",
	  		consumes = MediaType.APPLICATION_JSON_VALUE,
	  		produces = MediaType.APPLICATION_JSON_VALUE,
	  		method = RequestMethod.POST
	  )
	  // We return a ResponseEntity<Object> because the object returned may vary, could be product, could be an error
	  // The RequestBody is the information sent to us to process, post and put has request body, get and delete do not
	  // Request body is encrypted, always send password through a post request
	  public ResponseEntity<Object> save(@RequestBody Photo photo, @PathVariable Integer id) {

	      try {
	          Photo savedPhoto = photoService.save(photo);
	          Property property = propertyService.findById(id);
	          property.addPropertyPhoto(savedPhoto);
	          propertyService.save(property);
	          return new ResponseEntity<Object>(savedPhoto, HttpStatus.CREATED);
	      } catch (Exception e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }
	@RequestMapping(
	  		value = "/delete/{id}",
	  		consumes = MediaType.APPLICATION_JSON_VALUE,
	  		method = RequestMethod.DELETE
	  )
	  public void delete(@PathVariable Integer id) {

	      try {
	          Photo photo = photoService.findById(id);
	          Property property = propertyService.findById(photo.getPropertyId());
	          property.deletePropertyPhoto(photo);
	          propertyService.save(property);
	          photoService.deleteById(id);
	      } catch (Exception e) {
	          System.out.println(e);

	      } catch (Error e) {
	          System.out.println(e);
	      }

	  }
	@RequestMapping(
	  		value = "/findByPropertyId/{id}",
	  		consumes = MediaType.APPLICATION_JSON_VALUE,
	  		produces = MediaType.APPLICATION_JSON_VALUE,
	  		method = RequestMethod.GET
	  )
	public ResponseEntity<Object> findByPropertyId(Integer id) throws Exception {
		try { List<Photo> photos = photoService.findByPropertyId(id);
			return new ResponseEntity <Object> (photos, HttpStatus.OK);
		}catch (Exception e) {
	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

		
	}
	
}
