package cr.ac.ucr.happypet.Controller.billing;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Model.billing.Line;
import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Service.billing.bills_service.IBillService;
import cr.ac.ucr.happypet.Service.products.IProductService;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RequestMapping("/billing")
@Controller
public class BillingController extends MainController {

    @Autowired
    IProductService productsRepo;

    @Autowired
    IUserService usersRepo;

    @Autowired
    IBillService billsRepo;

    @GetMapping("/addToCart")
    public String addToCart(final Model model, @ModelAttribute ShoppingCart shoppingCart, final int id,
            final int quantity) {

        Line ln = new Line();
        ln.setQuantity(quantity);
        ln.setProduct(productsRepo.findById(id));
        shoppingCart.addLine(ln);

        return "layout/header";
    }

    @GetMapping("/removeFromCart")
    public String removeFromCart(final Model model, @ModelAttribute ShoppingCart shoppingCart, final long id) {
        shoppingCart.removeLine(id);
        return "billing/fragments/cart_table";
    }

    @GetMapping("/clear_cart")
    public String clearCart(final Model model, @ModelAttribute ShoppingCart shoppingCart, final String productCode) {
        shoppingCart.removeAll();
        return "billing/fragments/cart_table";
    }

    @GetMapping("/cart")
    public String clearCart() {
        return "billing/cart";
    }

    @GetMapping("/bill_detail/{id}")
    public String billDetail(@PathVariable int id, Model mod) {
        mod.addAttribute("bill", billsRepo.findById(id));
        return "billing/bill_detail";
    }

    @GetMapping("/my_bills/{id}")
    public String myanimals(Model mod, @PathVariable Integer id) {

        List<Bill> bills = billsRepo.getUnArchievedBills(id);
        mod.addAttribute("bills", bills);
        mod.addAttribute("user", id);
        mod.addAttribute("archievedTotal", billsRepo.getCountArchievedBills(id));
        return "billing/my_bills";
    }

    @GetMapping("/archive_bill/{user}/{id}")
    public String archiveBill(@PathVariable int id, @PathVariable int user, Model mod) {

        billsRepo.archieveBill(id);
        List<Bill> bills = billsRepo.getUnArchievedBills(user);
        mod.addAttribute("bills", bills);
        mod.addAttribute("archievedTotal", billsRepo.getCountArchievedBills(user));
        return "billing/fragments/bill_table";
    }

    @GetMapping("/unarchive_bills/{user}")
    public String unArchiveBills(@PathVariable int user, Model mod) {

        billsRepo.unArchieveBills(user);
        List<Bill> bills = billsRepo.getUnArchievedBills(user);
        mod.addAttribute("bills", bills);
        mod.addAttribute("archievedTotal", 0);
        return "billing/fragments/bill_table";
    }

}