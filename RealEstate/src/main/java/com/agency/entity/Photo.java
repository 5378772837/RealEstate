package com.agency.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity
@Table(name="photo")

public class Photo {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
    @Column(name="property_id")
    private Integer propertyId;
    
	@Column(name="image_path")
	private String imageLocation;
	

	public String getImageLocation() {
		return imageLocation;
	}

	public void setImageLocation(String imageLoc) {
		this.imageLocation = imageLoc;
	}
	
	public Integer getId() {
		return id;
	}
	
	public Integer getPropertyId() {
		return this.propertyId;
	}

	

}
