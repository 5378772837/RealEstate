package com.agency.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.agency.entity.Property;

@Repository  
public interface PropertyRepo extends JpaRepository<Property, Integer> {

    @Query(value="select * from property where id = ?1 ", nativeQuery = true)
    public Optional<Property> findById(Integer id);
	
    @Query(value="select * from property where is_sold = 0 AND city LIKE ?1", nativeQuery = true)
    public List<Property> findByCity(String city);
    
    @Query(value="select * from property where is_sold = 0 AND state LIKE ?1", nativeQuery = true)
    public List<Property> findByState(String state);
     
    @Query(value="select * from property where where is_sold = 0 AND price BETWEEN ?1 AND ?2;", nativeQuery = true)
    public List<Property> findByPrice(double fromPrice, double toPrice);
    
    @Query(value="select * from property where is_sold = 0", nativeQuery = true)
    public List<Property> findPropertiesInInvetory();
	
}