package com.agency.controller;

import java.util.List;
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
import com.agency.entity.Property;
import com.agency.service.PhotoService;
import com.agency.service.PropertyService;
import com.agency.service.UserService;
import com.agency.entity.Photo;


// Denotes that this will be a RESTFul
@RestController
@RequestMapping(value="/property")
@CrossOrigin("*")

public class PropertyController {


	// You can autowire any service you need to get the data from
  @Autowired
  PropertyService propertyService;

  @Autowired
  UserService userService;
  
  @Autowired
  PhotoService photoService;
 
  
  @RequestMapping(
          value="/AddProperty/{email}",
          consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE,
          method = RequestMethod.POST
      )
      public ResponseEntity<Object> addProperty(@RequestBody Property property, @PathVariable String email) {
	  		System.out.println(email+" "+ property);
          try {
              userService.addListingToUser(email,property);
              return new ResponseEntity<Object>(property, HttpStatus.OK);
          } catch (Exception e) {
              System.out.println(e);
              return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
          } catch (Error e) {
              System.out.println(e);
              return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
          }

      }
  
  @RequestMapping(
	      value="/addPhoto/{id}",
		  consumes = MediaType.APPLICATION_JSON_VALUE,
	      produces = MediaType.APPLICATION_JSON_VALUE,
	      method = RequestMethod.POST
	  )
	  public ResponseEntity<Object> addPhoto (@RequestBody Photo photo, @PathVariable Integer id) {

	      try {
	    	  photoService.save(photo);
	          Property foundProperty = propertyService.findById(id);
	          foundProperty.addPropertyPhoto(photo);
	          propertyService.update(foundProperty);
	          
	          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
	      } catch (Exception e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }
  @RequestMapping(
	      value="/deletePhoto/{id}/{photoId}",
		 
	      method = RequestMethod.DELETE
	  )
	  public ResponseEntity<Object> deletePhoto(@PathVariable Integer photoId, @PathVariable Integer id) {
	      try {
	    	  
	          Property foundProperty = propertyService.findById(id);
	          Photo photo = photoService.findById(photoId);
	          foundProperty.deletePropertyPhoto(photo);
	         
	          propertyService.update(foundProperty);
	          
	          photoService.deleteById(photo.getId());
	         
	         System.out.println(foundProperty.getPropertyPhotos().size());
	          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
	      } catch (Exception e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }
  
  
  @RequestMapping(
          value="/UpdateProperty",
          consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE,
          method = RequestMethod.POST
      )
      public ResponseEntity<Object> updateProperty (@RequestBody Property property) {

          try {
             
              return new ResponseEntity<Object>(property, HttpStatus.OK);
          } catch (Exception e) {
              System.out.println(e);
              return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
          } catch (Error e) {
              System.out.println(e);
              return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
          }

      }

  
  @RequestMapping(
      value="/findPropertyById/{id}",
      produces = MediaType.APPLICATION_JSON_VALUE,
      method = RequestMethod.GET
  )
  public ResponseEntity<Object> findPropertyById(@PathVariable Integer id) {

      try {
          Property foundProperty = propertyService.findById(id);
          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
      } catch (Exception e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Error e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }

  

  @RequestMapping(
      value="/findPropertyByCity/{city}",
      produces = MediaType.APPLICATION_JSON_VALUE,
      method = RequestMethod.GET
  )
  public ResponseEntity<Object> findPropertyByCity(@PathVariable String city) {

      try {
          List <Property> foundProperty = propertyService.findByCity(city);
          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
      } catch (Exception e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Error e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }
  
  		@RequestMapping(
	      value="/findPropertyByState/{state}",
	      produces = MediaType.APPLICATION_JSON_VALUE,
	      method = RequestMethod.GET
  		)
	  public ResponseEntity<Object> findPropertyByState(@PathVariable String state) {

	      try {
	          List <Property> foundProperty = propertyService.findByState(state);
	          return new ResponseEntity<Object>(foundProperty, HttpStatus.OK);
	      } catch (Exception e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }

  @RequestMapping(
      value="/findAll",
      method = RequestMethod.GET
  )
  public ResponseEntity<Object> findAll() {

      try {
          List<Property> allProperties = propertyService.findAll();
          return new ResponseEntity<Object>(allProperties, HttpStatus.OK);
      } catch (Exception e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Error e) {
          System.out.println(e);
          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }
  
  @RequestMapping(
	      value="/findPropertiesInInventory",
	      method = RequestMethod.GET
	  )
	  public ResponseEntity<Object> findPropertiesInInventory() {

	      try {
	          List<Property> inventoryProperties = propertyService.findAll();
	          return new ResponseEntity<Object>(inventoryProperties, HttpStatus.OK);
	      } catch (Exception e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
	      } catch (Error e) {
	          System.out.println(e);
	          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
	      }

	  }


  @RequestMapping(
      value="/deleteProperty/{id}",
      method = RequestMethod.DELETE
  )
  public ResponseEntity<Object> deleteProperty(@PathVariable Integer id) {

      try {
          // 
          propertyService.deleteById(id);
          return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
      } catch (Exception e) {
          return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Error e) {
          return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }

	
	
}
