package com.agency.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.agency.entity.User;

@Repository  
public interface UserRepo extends JpaRepository<User, Integer> {

    @Query(value="select * from user where email = ?1 and password = ?2", nativeQuery = true)
    public User signIn(String email, String password);
	
    @Query(value="select * from user where email = ?1", nativeQuery = true)
    public User findByEmail(String email);
	
}
