package com.agency.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

//Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
//Tells what table the object is coming from
@Table(name="user")
public class User {

	//THE BELOW MUST BE IN EACH ENTITY
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "email", unique = true)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "is_agent", nullable = false)
	private Boolean isAgent;
	
	@OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Property> properties;
    
    @OneToMany
    @JoinColumn(name = "agent_id", referencedColumnName = "id")
    private List<Property> listings;
	
    
	public User() {}
	
	
    public boolean isAgent() {
		return isAgent;
	}



	public void setIsAgent(boolean isAgent) {
		this.isAgent = isAgent;
	}


	public List<Property> getProperties() {
		return properties;
	}


	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}
	public void addProperty(Property property) {
		properties.add(property);
	}



	public List<Property> getListings() {
		return listings;
	}


	public void setListings(List<Property> listings) {
		this.listings = listings;
	}


	public void addListing(Property listing) {
		listings.add(listing);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public Integer getId() {
		return id;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", name=" + name + ", isAgent="
				+ isAgent + ", properties=" + properties + ", listings=" + listings + "]";
	}


}
