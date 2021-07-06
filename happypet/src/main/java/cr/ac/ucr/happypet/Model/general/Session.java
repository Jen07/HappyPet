package cr.ac.ucr.happypet.Model.general;

import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Model.users.User;

public class Session {

    private User activeUser;
    private ShoppingCart cart;

    public boolean booleano = true;

    public Session() {
        cart = new ShoppingCart();
        activeUser = new User();
    }

    public User getActiveUser() {
        return activeUser;
    }

    public void setActiveUser(User activeUser) {
        this.activeUser = activeUser;
    }

    public ShoppingCart getCart() {
        return cart;
    }

    public void setCart(ShoppingCart cart) {
        this.cart = cart;
    }

}
