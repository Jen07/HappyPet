package cr.ac.ucr.happypet.Controller.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RestController
@RequestMapping("/client")
public class Client_Controller extends MainController{

    @Autowired
    private IUserService svClient;


    @GetMapping("/addClient")
    public ModelAndView name() {
        ModelAndView view = new ModelAndView();
        /**FILTRAR SOLO LOS TIPO CLIENTE*/
        /*Lo mismo en Empleados o Veridicar lista empleados*/
		view.setViewName("users/client/addClient");
		return view;
    }

    @RequestMapping("/listar")
	public ResponseEntity<List<User>> listar() {
		List<User> lista = svClient.getAll();
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}
    
    @PostMapping("/add")
    public String inicio(@RequestParam("id") int id, @RequestParam("name") String name,
    @RequestParam("lastName") String lastName,@RequestParam("tel") String tel, 
    @RequestParam("passw") String passw,@RequestParam("address") String address, @RequestParam("mail") 
    String mail) {
        
        User client = new User(id, name, lastName, passw, mail, tel, address,"Cliente");
        svClient.add(client);

        return "Agregado";
    }




}
