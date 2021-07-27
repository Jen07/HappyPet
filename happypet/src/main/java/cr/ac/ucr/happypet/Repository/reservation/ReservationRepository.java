package cr.ac.ucr.happypet.Repository.reservation;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import cr.ac.ucr.happypet.Model.reservation.ReservationHotel;

public interface ReservationRepository extends JpaRepositoryImplementation<ReservationHotel,Integer>{
  
	@Query(value="SELECT * FROM tb_reservation WHERE userId= ?1",
			nativeQuery = true)	
	List<ReservationHotel> getReservationUser(int userId);
}