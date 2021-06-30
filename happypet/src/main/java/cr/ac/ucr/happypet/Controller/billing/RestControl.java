package cr.ac.ucr.happypet.Controller.billing;

import java.sql.Date;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Model.billing.Line;
import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Service.billing.bills_service.IBillService;
import cr.ac.ucr.happypet.Service.billing.lines_service.ILinesService;
import cr.ac.ucr.happypet.Service.users.IUserService;
import cr.ac.ucr.happypet.Service.billing.threads.Mailing;

@RestController
@RequestMapping("/billing")
public class RestControl extends MainController {

    @Autowired
    IUserService usersRepo;

    @Autowired
    IBillService billsRepo;

    @Autowired
    ILinesService linesRepo;

    @Autowired
    Mailing mailing;

    @GetMapping("/buyout")
    public ResponseEntity<Integer> billDetail(@ModelAttribute ShoppingCart shoppingCart) {
        Bill bill = new Bill();
        // ------------------------------------------------------------>Usurio estatico
        // cambiar por actual.
        bill.setClient(usersRepo.findById(1));
        bill.setReceivedAt(new Date(Calendar.getInstance().getTime().getTime()));

        Bill saved = billsRepo.save(bill);
        for (Line ln : shoppingCart.getListLines()) {
            ln.setBill(saved);
        }

        linesRepo.saveAll(shoppingCart.getListLines());
        return new ResponseEntity<>(saved.getId(), HttpStatus.OK);
    }

    @PostMapping("/send_mail")
    public ResponseEntity<?> billDetail(@RequestParam int id) {

        Bill bill = billsRepo.findById(id);
        mailing.sendBill(bill);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}