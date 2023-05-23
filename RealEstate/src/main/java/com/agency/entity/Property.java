package com.agency.entity;

import java.text.ParseException;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

//Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
//Tells what table the object is coming from
@Table(name="property")

public class Property{

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="description")
	private String description;
	
	@Column(name="bedrooms")
	private Integer bedrooms;
	
	@Column(name="bathrooms")
	private Integer bathrooms;
	
	@Column(name="sq_foot")
	private Integer sqFoot;
	
	@Column(name="acres")
	private Double acres;
	
	@Column(name = "address")
	private String stAddress;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "state")
	private String state;
	
	@Column(name = "zip")
	private Integer zip;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "is_sold")
	private Boolean isSold=false;
	
	@Column(name = "sale_price")
	private Double salePrice=0.00;
	
	@Column(name = "listDate")
	private LocalDate listDate;
	
	@Column(name = "dateSold")
	private LocalDate dateSold;
	
	@Column(name = "discount")
	private Double discount=0.00;
    
	@OneToMany	    
	@JoinColumn(name="property_Id",referencedColumnName="id")
	private List<Photo> propertyPhotos=new ArrayList<>();
	
	public Property(){
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(Integer bedrooms) {
		this.bedrooms = bedrooms;
	}

	public Integer getBathrooms() {
		return bathrooms;
	}

	public void setBathrooms(Integer bathrooms) {
		this.bathrooms = bathrooms;
	}

	public Double getAcres() {
		return acres;
	}

	public void setAcres(Double acres) {
		this.acres = acres;
	}

	public double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(double salePrice) {
		this.salePrice = salePrice;
	}

	public LocalDate getDateSold() {
		return dateSold;
	}

	public void setDateSold(LocalDate dateSold) {
		this.dateSold = dateSold;
	}

	public void setPropertyPhotos(List<Photo> propertyPhotos) {
		this.propertyPhotos = propertyPhotos;
	}

	public Integer getId() {
		return id;
	}

	public String getStAddress() {
		return stAddress;
	}

	public void setStAddress(String stAddress) {
		this.stAddress = stAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getZip() {
		return zip;
	}

	public void setZip(Integer zip) {
		this.zip = zip;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public LocalDate getListDate(){
		return listDate;
	}
	public void setListDate(LocalDate date) throws ParseException{
	this.listDate=date;	
	}
	public boolean isSold() {
		return isSold;
	}

	public void setSold(boolean isSold) {
		this.isSold = isSold;
	}

	public List<Photo> getPropertyPhotos() {
		return propertyPhotos;
	}

	public void addPropertyPhoto(Photo photo) {
		this.propertyPhotos.add(photo);
	}
	public void deletePropertyPhoto(Photo photo) {
		this.propertyPhotos.remove(photo);
	}

	public void setDiscount() {
		LocalDate today = LocalDate.now();
		long diff = ChronoUnit.DAYS.between(this.getListDate(), today);
		if(diff>90){this.discount=this.getPrice()*0.10;}else {this.discount = 0.00;}
	}
	public double getDiscount() {
		return this.discount;
	}
	
	public Integer getSqFoot() {
		return sqFoot;
	}

	public void setSqFoot(Integer sqFoot) {
		this.sqFoot = sqFoot;
	}

	@Override
	public String toString() {
		return "Property [id=" + id + ", description=" + description + ", bedrooms=" + bedrooms + ", bathrooms="
				+ bathrooms + ", sqFoot=" + sqFoot + ", acres=" + acres + ", stAddress=" + stAddress + ", city=" + city
				+ ", state=" + state + ", zip=" + zip + ", price=" + price + ", isSold=" + isSold + ", salePrice="
				+ salePrice + ", listDate=" + listDate + ", dateSold=" + dateSold + ", discount=" + discount
				+ ", propertyPhotos=" + propertyPhotos + "]";
	}



	
}
