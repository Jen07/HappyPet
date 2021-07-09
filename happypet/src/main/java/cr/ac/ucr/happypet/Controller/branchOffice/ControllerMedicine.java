package cr.ac.ucr.happypet.Controller.branchOffice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import cr.ac.ucr.happypet.Controller.MainController;

@Controller
@RequestMapping("medicine")
public class ControllerMedicine extends MainController {
    
    @GetMapping("/")
	public String mostrarIndex() {
		
		return "/medicine/indexMedicine";
	}
}
