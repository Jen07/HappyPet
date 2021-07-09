package cr.ac.ucr.happypet.Service.reservation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.reservation.ReservationHotel;
import cr.ac.ucr.happypet.Repository.reservation.ReservationRepository;

@Service
public class ReservationServiceImp implements IReservation {

    @Autowired
    private ReservationRepository repo;

    @Override
    public List<ReservationHotel> findAll() {
        return repo.findAll();
    }

    @Override
    public void save(ReservationHotel reservation) {
      repo.save(reservation);  
    }

    @Override
    public void delete(Integer id) {
       repo.deleteById(id);  
    }

    @Override
    public void modify(ReservationHotel reservation, int id) {
        Optional<ReservationHotel> optional= repo.findById(id);
		
		if(optional.isPresent()) {
			
			ReservationHotel reservChange= optional.get();
			reservChange.setAnimal(reservation.getAnimal());
			reservChange.setHotel(reservation.getHotel());
			reservChange.setEntryDate(reservation.getEntryDate());
			reservChange.setDepartureDate(reservation.getDepartureDate());
			repo.save(reservChange);

		}
        
    }

    @Override
    public ReservationHotel buscarPorId(Integer id) {
        return repo.findById(id).get();
    }

}