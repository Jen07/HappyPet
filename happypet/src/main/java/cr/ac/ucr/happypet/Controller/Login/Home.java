package cr.ac.ucr.happypet.Controller.Login;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Service.users.IUserService;


@Controller
public class Home extends  MainController{

	@Autowired
	IUserService svUser;
	
	//Inicio
	@RequestMapping("/inicio")
	public String inicio() {
		return "inicio";
	}


	//Regustrarse
	@RequestMapping("/")
	public String login() {
		return "/general/login";
	}
    
	//Verifica el login
	@PostMapping("/checkloging")
	@ResponseBody
	public String checkLogin(@RequestParam String id,@RequestParam String password) {
		String check =svUser.checkUser(id, password);
		return check;
	}
	
	/*Ingresa a cuenta employee*/	
	@RequestMapping("/entry")
	public String checkLogin(){		
		return "users/list_employee";
	}

}