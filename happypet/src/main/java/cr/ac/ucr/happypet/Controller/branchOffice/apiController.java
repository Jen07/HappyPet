package cr.ac.ucr.happypet.Controller.branchOffice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;
import cr.ac.ucr.happypet.Service.branchOffice.iCantonService;
import cr.ac.ucr.happypet.Service.branchOffice.iSucursalService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value="/sucursales")
public class apiController {

	@Autowired
	private iSucursalService sv;
	
	
	@Autowired
	private iCantonService svC;
	
	@GetMapping("/listSucursal")
	public ResponseEntity<List<Sucursal>> getListSucursal(){
		
		
		return new ResponseEntity<List<Sucursal>>(sv.listar(),HttpStatus.OK);
	}
	
	@GetMapping("/listCantones/{codigoProvincia}")
public ResponseEntity<List<String>> getListCantones(@PathVariable int codigoProvincia){
		
		System.out.println("entro a la api por cantones");
		return new ResponseEntity<List<String>>(svC.getCantones(codigoProvincia),HttpStatus.OK);
	}


	
	@GetMapping("/getSucursal/{id}")
	public ResponseEntity<Sucursal> getSucursal(@PathVariable String id){
		return new ResponseEntity<Sucursal>(sv.searchById(id),HttpStatus.OK);
	}

	@PostMapping("/addSucursal")
	public ResponseEntity<Integer> addSucursal(@RequestBody Sucursal sucursal){
		System.out.println("inserto bien");
		sv.save(sucursal);
		return new ResponseEntity<Integer>(1,HttpStatus.OK);
	}
	
	@PutMapping("/updateSucursal")
	public ResponseEntity<Integer> updateSucursal(@RequestBody Sucursal sucursal){
		sv.update(sucursal);
		return new ResponseEntity<Integer>(1,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteSucursal(@PathVariable String id){
		
		sv.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
