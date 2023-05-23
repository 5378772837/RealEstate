package com.agency.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.agency.entity.Photo;


@Repository  
public interface PhotoRepo extends JpaRepository<Photo, Integer> {
    @Query(value="select * from photo where property_id = ?1 ", nativeQuery = true)
    public List<Photo> findByPropertyId(Integer propertyId);
}
