package cr.ac.ucr.happypet.Controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import cr.ac.ucr.happypet.Model.billing.ShoppingCart;

@SessionAttributes("shoppingCart")
public class MainController {
 
    @ModelAttribute("shoppingCart")
    public ShoppingCart shoppingCart(@SessionAttribute(required = false) ShoppingCart shoppingCart) {
        
        if(shoppingCart == null){
            shoppingCart = new ShoppingCart();
        }
        return shoppingCart;
    }  
}