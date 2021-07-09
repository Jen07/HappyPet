package cr.ac.ucr.happypet.Model.reservation;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Model.hotel.Hotel;
import cr.ac.ucr.happypet.Model.users.User;

@Entity
@Table(name="tb_reservation")
public class ReservationHotel {
    
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int code;

    private Date entryDate;
    private Date departureDate;

    @OneToOne
    @JoinColumn (name="animalId")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name="codeHotel")
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    public  ReservationHotel(){

    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ReservationHotel [animal=" + animal + ", code=" + code + ", departureDate=" + departureDate
                + ", entryDate=" + entryDate + ", hotel=" + hotel + ", user=" + user + "]";
    }


}
