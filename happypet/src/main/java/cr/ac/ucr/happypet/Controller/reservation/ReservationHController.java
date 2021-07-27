package  cr.ac.ucr.happypet.Controller.reservation;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import cr.ac.ucr.happypet.Controller.MainController;


@Controller
@RequestMapping(value="/reservacion")
public class ReservationHController extends MainController{


    @RequestMapping(value="/index")
    public String index(){
        return "reservation/index.html";
    }

    @GetMapping("/listado/{id}")
    public String listado(@PathVariable Integer id, Model model){
        model.addAttribute("idUser",id);
        return "reservation/listado.html";
    }

}