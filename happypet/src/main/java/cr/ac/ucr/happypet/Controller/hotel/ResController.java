package  cr.ac.ucr.happypet.Controller.hotel;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;
import cr.ac.ucr.happypet.Model.hotel.Hotel;
import cr.ac.ucr.happypet.Service.branchOffice.iSucursalService;
import cr.ac.ucr.happypet.Service.hotel.IHotel;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(value="hoteles")
@CrossOrigin(origins = "*")
public class ResController {

    @Autowired
    IHotel hotelService;
    
    @Autowired
    iSucursalService sucursalS;

    @PostMapping(value="/save")
    public ResponseEntity<Integer> registrarHotel(@RequestBody Hotel hotel) {
    	
        hotel.setSucursal(sucursalS.searchById(String.valueOf(hotel.getCode())));
        hotel.setCode(0);
        hotelService.guardar(hotel);
       
        return new ResponseEntity<Integer>(1,HttpStatus.OK);
    }
    
    @DeleteMapping(value="/delete/{code}")
    public ResponseEntity<Void> deleteHotel(@PathVariable int code){
    	hotelService.eliminar(code);
    	return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping(value = "/GetHotel/{code}")
    public ResponseEntity<Hotel> modify(@PathVariable int code){
    
         Hotel hotel=hotelService.buscarPorId(code);
   
        return new ResponseEntity<>(hotel,HttpStatus.OK);
    }
    
     @GetMapping(value="/listaSucursales")
     public  ResponseEntity<List<Sucursal>> lista(){
     	List<Sucursal>lista= sucursalS.listar();
     	return new ResponseEntity<>(lista,HttpStatus.OK);
     }
    
    @PostMapping(value="/modify/{code}")
    public ResponseEntity<Integer> modifyHotel(@RequestBody Hotel hotel, @PathVariable int code){
        System.out.println("HOLA");
        System.out.println("----------CODIGO:    "+code);
        hotel.setSucursal(sucursalS.searchById(String.valueOf(hotel.getCode())));
        hotel.setCode(0);
        hotelService.modificar(hotel, code);
    	return new ResponseEntity<>(1,HttpStatus.OK);
    }

    @GetMapping(value = "/listaHoteles")
    public  ResponseEntity<List<Hotel>> listaH(){
    	List<Hotel>lista= hotelService.buscarTodas();
    	return new ResponseEntity<>(lista,HttpStatus.OK);
    }
    
}
