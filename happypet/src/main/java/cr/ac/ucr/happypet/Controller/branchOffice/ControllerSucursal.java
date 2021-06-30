package cr.ac.ucr.happypet.Controller.branchOffice;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;






@Controller
@RequestMapping("/sucursal")
public class ControllerSucursal {
	
	

	
	@GetMapping("/")
	public String mostrarIndex() {
		
		return "/branchOffice/index";
	}
	
	@GetMapping("/formSucursal")
	public String formSucursal() {
		
		return "/branchOffice/insertSucursal";
	}
	
	@GetMapping("/listarImages")
	public String listImages() {
		
		return "/branchOffice/listaImages";
	}

	
	@GetMapping("/listar")
	public String listarSucursales(Model model) {
		
		
		return "/branchOffice/listarSucursales";
	}
	
	
	

}
