package  cr.ac.ucr.happypet.Controller.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Model.hotel.Hotel;
import cr.ac.ucr.happypet.Model.reservation.ReservationHotel;
import cr.ac.ucr.happypet.Service.animals.animals_service.IAnimalsService;
import cr.ac.ucr.happypet.Service.hotel.IHotel;
import cr.ac.ucr.happypet.Service.reservation.IReservation;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RestController
@RequestMapping(value="reservaciones")
@CrossOrigin(origins = "*")
public class ResReservationHController {
    
    @Autowired
    private IHotel repoH;

    @Autowired
    private IAnimalsService repoA;

    @Autowired
    private IReservation repoR;
    
    @Autowired
    private IUserService repoU;

    @GetMapping(value="/listaHotels")
    public ResponseEntity<List<Hotel>> listaH(){
        
        List<Hotel>lista= repoH.buscarTodas();
          for (Hotel hotel : lista) {
              hotel.setReservations(null);
          }
    	return new ResponseEntity<>(lista,HttpStatus.OK); 
    }

    @GetMapping(value="/listaAnimals/{owner}")
    public ResponseEntity<List<Animal>> listaA(@PathVariable int owner){

        List<Animal>lista= repoA.findByOwner(owner);
       
    	return new ResponseEntity<>(lista,HttpStatus.OK); 
    }

    @PostMapping(value="save/{animal}/{hotel}/{idUser}")
    public ResponseEntity<Void> save(@PathVariable int animal, @PathVariable int hotel,
    @PathVariable int idUser, @RequestBody ReservationHotel reservation) {
           reservation.setAnimal(repoA.findById(animal)); 
           reservation.setHotel(repoH.buscarPorId(hotel));
           reservation.setUser(repoU.findById(idUser));
           repoR.save(reservation);
        return new ResponseEntity<>(HttpStatus.OK); 
    }

    @GetMapping(value="/list/{userId}")
    public ResponseEntity<List<ReservationHotel>> list(@PathVariable int userId){
        List<ReservationHotel> list= repoR.getReservationUser(userId);
         for (ReservationHotel r : list) {
            r.getAnimal().setBorn(null);
            r.getAnimal().setImages(null);
            r.getAnimal().setRegisterId(null);
            r.getUser().setReservations(null);
        }
        return new ResponseEntity<>(list,HttpStatus.OK); 
    }
}