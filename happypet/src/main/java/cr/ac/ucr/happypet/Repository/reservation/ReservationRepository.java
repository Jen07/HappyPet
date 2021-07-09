package cr.ac.ucr.happypet.Repository.reservation;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import cr.ac.ucr.happypet.Model.reservation.ReservationHotel;

public interface ReservationRepository extends JpaRepositoryImplementation<ReservationHotel,Integer>{
  

}