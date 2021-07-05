package cr.ac.ucr.happypet.Controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import cr.ac.ucr.happypet.Model.billing.Line;
import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Model.products.Product;
import cr.ac.ucr.happypet.Model.users.User;

@SessionAttributes("shoppingCart, activeUser")
public class MainController {

    @ModelAttribute("shoppingCart")
    public ShoppingCart shoppingCart(@SessionAttribute(required = false) ShoppingCart shoppingCart) {

        if (shoppingCart == null) {
            shoppingCart = new ShoppingCart();

            Line ln = new Line();
            Product pr = new Product("Mimados", 2500, "Alimento para cachorro", "Perro");
            pr.setCod_product(1);
            ln.setProduct(pr);
            ln.setQuantity(5);

            shoppingCart.addLine(ln);

        }
        return shoppingCart;
    }

    @ModelAttribute("activeUser")
    public User activeUser(@SessionAttribute(required = false) User activeUser) {

        if (activeUser == null) {
            activeUser = new User();
        }

        return activeUser;
    }

}