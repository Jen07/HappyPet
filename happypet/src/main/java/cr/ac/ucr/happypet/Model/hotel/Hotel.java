package  cr.ac.ucr.happypet.Model.hotel;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;

@Entity
@Table(name="tb_hotel")
public class Hotel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int code;

	private int numberOfRooms;
	private int price;
	private String phone;
	private String address;
	private String description;
	
	 @OneToOne
	 @JoinColumn (name="cedulaJuridica")
	 private Sucursal sucursal;
	
	

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	 public Sucursal getSucursal() {
	 	return sucursal;
	 }

	 public void setSucursal(Sucursal sucursal) {
	 	this.sucursal = sucursal;
	 }
	
	

	@Override
	public String toString() {
		return "Hotel [code=" + code + ", numberOfRooms=" + numberOfRooms + ", price=" + price + ", phone=" + phone
				+ ", address=" + address + ", description=" + description + "]";
	}

	

}
