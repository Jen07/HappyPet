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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.branchOffice.Canton;
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
public ResponseEntity<List<Canton>> getListCantones(@PathVariable int codigoProvincia){
		return new ResponseEntity<List<Canton>>(svC.getCantones(codigoProvincia),HttpStatus.OK);
	}


	
	@GetMapping("/getSucursal/{id}")
	public ResponseEntity<Sucursal> getSucursal(@PathVariable String id){
		return new ResponseEntity<Sucursal>(sv.searchById(id),HttpStatus.OK);
	}

	@GetMapping("/getSucursalById/{id}")
	public ResponseEntity<Boolean> getSucursalById(@PathVariable String id){
		return new ResponseEntity<Boolean>(sv.getSucursalById(id),HttpStatus.OK);
	}
	

	@PostMapping("/addSucursal/{idCanton}")
	public ResponseEntity<Integer> addSucursal(@PathVariable int idCanton,@RequestBody Sucursal sucursal){		
	
		Canton canton=svC.getCanton(idCanton);
		canton.setEstado(false);
		svC.updateCanton(canton);
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
		Sucursal sucursal =sv.searchById(id);
		Canton canton=svC.getCantonByNameAndProvincia(sucursal.getProvincia(),sucursal.getCiudad());
		canton.setEstado(true);
		svC.updateCanton(canton);
		sv.delete(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@GetMapping("/filter_table")
    public ResponseEntity<List<Sucursal>> filterTable(@RequestParam String filterBy, String filter) {
		System.out.println(filterBy+"-------------------------------");
		System.out.println(filter+"-------------------------------");
        List<Sucursal> sucursal = null;

        switch (filterBy) {
            case "cedulaJuridica":
			sucursal = sv.findByCedulaJuridica(filter);
                break;

            case "Provincia":
			sucursal = sv.findByProvincia(Integer.parseInt(filter));
                break;

            case "Ciudad":
			sucursal = sv.findByCiudad(filter);
                break;

        }
		System.out.println(sucursal.size()+"-------------------------------");
		return new ResponseEntity<List<Sucursal>>(sucursal,HttpStatus.OK);
	}
}
