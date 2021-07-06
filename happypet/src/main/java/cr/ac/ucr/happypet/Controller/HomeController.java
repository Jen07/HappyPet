package cr.ac.ucr.happypet.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class HomeController extends MainController {

    @GetMapping({ "/", "/index", "/home" })
    public String home() {
        return "branchOffice/index";
    }

}