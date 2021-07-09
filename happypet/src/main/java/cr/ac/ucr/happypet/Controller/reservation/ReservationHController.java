package  cr.ac.ucr.happypet.Controller.reservation;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import cr.ac.ucr.happypet.Controller.MainController;


@Controller
@RequestMapping(value="/reservacion")
public class ReservationHController extends MainController{


    @RequestMapping(value="/index")
    public String index(){
        return "reservation/index.html";
    }

    @GetMapping("/listado")
    public String listado(){
        return "reservation/listado.html";
    }

}