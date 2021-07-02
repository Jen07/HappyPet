package  cr.ac.ucr.happypet.Controller.hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.hotel.Hotel;
import cr.ac.ucr.happypet.Service.branchOffice.iSucursalService;
import cr.ac.ucr.happypet.Service.hotel.IHotel;



@Controller
@RequestMapping(value="/hotel")
public class HotelController extends MainController{
	
	@Autowired
	IHotel hotelService;
	
	@Autowired
	iSucursalService sucursalService;

	@GetMapping({ "/index", "/", "/home" })
	public String index() {
		return "/index";
	}
	
	@RequestMapping(value= "/registro",method=RequestMethod.GET)
	public String registro(Model model){
		System.out.println("HOLA");
		model.addAttribute("sucursales",sucursalService.listar());
		return "hotel/registro";
	}
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String guardar(Hotel hotel,@RequestParam("codSucursal") String id, Model model) {
		
		hotel.setSucursal(sucursalService.searchById(id));
		
		hotelService.guardar(hotel);
		
		model.addAttribute("titulo","se inserto exitosamente");
		
		return "hotel/mensaje";
	}
	
	@RequestMapping("/mostrar")
	public String mostrar(Model model){
		
		model.addAttribute("hoteles", hotelService.buscarTodas());
		
		return "hotel/listaHoteles";
	}
	
	
}
