package cr.ac.ucr.happypet.Controller.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Bussines.Logic;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RestController
@RequestMapping("/client")
public class Client_Controller extends MainController {

    @Autowired
    private IUserService svClient;
    private Logic log = new Logic();

    //Muestra el inicio
    @RequestMapping("/inicio")
	public ModelAndView checkLogin(){		
		ModelAndView view = new ModelAndView();
		view.setViewName("/users/client/list");
		return view;
	}

    //Dirige al form de agregar
    @GetMapping("/addClient")
    public ModelAndView name() {
        ModelAndView view = new ModelAndView();
        view.setViewName("users/client/addClient");
        return view;
    }

    //Manda la lista para js
    @RequestMapping("/listar")
    public ResponseEntity<List<User>> listar() {
        List<User> lista = log.listarCliente(svClient.getAll());
        System.out.println(lista.size());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    
	// Obtiene la información del cliente a mostrar en detalles 
	@GetMapping("/detail/{id}")
	public User getDetailClient(@PathVariable int id) {
        System.out.println(id);
		return svClient.findById(id);
	}

    //Elimina al CLiente
	@PostMapping("/delete")
	public String delete(@RequestParam int id) {
		svClient.delete(id);
		return "Elimino";
	}

    
	@PostMapping("/search")
	public ModelAndView search(@RequestParam String text, @RequestParam String filtro, Model model) {
		model.addAttribute("employee", log.searchClient(svClient.getAll(), text, filtro));
		ModelAndView view = new ModelAndView();
		view.setViewName("/users/client/div");
		return view;
	}

    //-------------------------------------------------------------------------

    @PostMapping("/add")
    public String inicio(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("phone") String tel,
            @RequestParam("passw") String passw,@RequestParam("mail") String mail) {

        User client = new User(id, name, lastName, passw, mail, tel,"", "Cliente");
        svClient.add(client);

        return "Agregado";
    }

}
