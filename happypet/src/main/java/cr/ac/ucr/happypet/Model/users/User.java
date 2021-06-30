package cr.ac.ucr.happypet.Model.users;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;


@Entity
@Table(name="tb_user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	
	@Id
	private int id;
    private String name;
    private String lastName;
    private String mail;
    private String phone;
    private String address;
    private String password;

    private String imagen;

    public User() {}
    
    public User(int id, String name, String lastName,String password, String mail, 
    String phone,String address,String imagen) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.mail = mail;
        this.phone = phone;
        this.address = address;
        this.imagen = imagen;
    }
    
      public User(int id, String name, String lastName, String password, String mail, 
              String phone, String address) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.mail = mail;
        this.phone = phone;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

	public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    @Override
    public String toString() {
        return "User [address=" + address + ", id=" + id + ", imagen=" + imagen + ", lastName=" + lastName + ", mail="
                + mail + ", name=" + name + ", password=" + password + ", phone=" + phone + "]";
    }

    
	

}
