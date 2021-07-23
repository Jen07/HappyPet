package cr.ac.ucr.happypet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
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

    // Verifica el login
    @PostMapping("/checkloging")
    @ResponseBody
    public String checkLogin(@RequestParam String id, @RequestParam String password) {
        String check = svUser.checkUser(id, password);
        return check;
    }

    @PostMapping("/login")
    public String makeLogin(@RequestParam int userId, @ModelAttribute ShoppingCart session) {
        session.setUser(svUser.findById(userId));
        return "redirect:/sucursal/";
    }

    @GetMapping("/entryLogin")
    public String login(@ModelAttribute ShoppingCart session){
        session.setUser(new User());
        return "redirect:/index";
    }

    @GetMapping("/register")
    public String name() {
        return "general/inicioS";
    }

    @GetMapping("/perfil")
    public String perfil() {
        return "/general/perfil";
    }


}