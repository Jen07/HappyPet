package cr.ac.ucr.happypet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Service.users.IUserService;

@Controller

public class HomeController extends MainController {

    @Autowired
	IUserService svUser;

    @GetMapping({ "/", "/index", "/home" })
    public String login() {
		return "/general/login";
	}

    //Verifica el login
	@PostMapping("/checkloging")
	@ResponseBody
	public String checkLogin(@RequestParam String id,@RequestParam String password) {
        String check = svUser.checkUser(id, password);
        System.out.println(check);
		return check;
	}

    @PostMapping("/login")
    public String removeFromCart(@ModelAttribute User activeUser,final int id) {
        //activeUser =  svUser.findById(id);
        activeUser.setName(svUser.findById(id).getName());
        System.out.println("---------------------- "+activeUser.getName());
        System.out.println("---------------------- "+activeUser.getType());
        
        return "redirect:/sucursal/";
    }

}