package cr.ac.ucr.happypet.Controller.branchOffice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.medicine.Medicina;
import cr.ac.ucr.happypet.Service.medicine.iMedicine;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value="/medicine")
public class apiMedicine {


    @Autowired
    private iMedicine ms;

    @PostMapping("/save")
	public ResponseEntity<Integer> addSucursal(@RequestBody Medicina medicine){		
	
		ms.save(medicine);
		return new ResponseEntity<Integer>(1,HttpStatus.OK);
	}
    
}
