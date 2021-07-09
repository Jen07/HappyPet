package cr.ac.ucr.happypet.Service.reservation;

import java.util.List;

import cr.ac.ucr.happypet.Model.reservation.ReservationHotel;

public interface IReservation {

    List<ReservationHotel> findAll ();
	
	void save (ReservationHotel reservation);
	
	void delete(Integer id);
	
	void modify(ReservationHotel reservation, int id);
	
	ReservationHotel buscarPorId(Integer id); 
}
