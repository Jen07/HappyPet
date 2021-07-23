package cr.ac.ucr.happypet.Controller.billing;

import java.sql.Date;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Model.billing.Line;
import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Model.billing.SimpleBill;
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

        bill.setClient(shoppingCart.getUser());
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

    @GetMapping("/my_bills_J/{id}")
    public List<SimpleBill> getBills(@PathVariable int id) {

        List<Bill> full = billsRepo.getUnArchievedBills(id);
        List<SimpleBill> simpleBills = new LinkedList<>();

        for (Bill bill : full) {
            simpleBills.add(new SimpleBill(bill.getId(), bill.getFormattedDate(), bill.getTotalString()));
        }

        return simpleBills;
    }

    @GetMapping("/getUnarchievedTotal/{id}")
    public int getUnarchievedTotal(@PathVariable int id) {
        return billsRepo.getCountArchievedBills(id);
    }

    @GetMapping("/getFilteredDate/{id}/")
    public List<SimpleBill> getUnarchievedTotal(@PathVariable int id, @RequestParam String date) {

        List<Bill> full = billsRepo.getUnArchievedBills(id);

        List<SimpleBill> simpleBills = new LinkedList<>();

        for (Bill bill : full) {
            if (bill.getFormattedDate().equals(date)) {

                simpleBills.add(new SimpleBill(bill.getId(), bill.getFormattedDate(), bill.getTotalString()));
            }
        }

        return simpleBills;
    }

    @GetMapping("/getFilteredDateAll/")
    public List<SimpleBill> getFilteredDateAll(@RequestParam String date) {

        List<Bill> full = billsRepo.findAll();

        List<SimpleBill> simpleBills = new LinkedList<>();

        for (Bill bill : full) {
            if (bill.getFormattedDate().equals(date)) {

                simpleBills.add(new SimpleBill(bill.getId(), bill.getFormattedDate(), bill.getTotalString(),
                        (bill.getClient().getName() + " " + bill.getClient().getLastName())));
            }
        }

        return simpleBills;
    }

    @GetMapping("/all_bills")
    public List<SimpleBill> getAllBills() {

        List<Bill> full = billsRepo.findAll();
        List<SimpleBill> simpleBills = new LinkedList<>();

        for (Bill bill : full) {
            simpleBills.add(new SimpleBill(bill.getId(), bill.getFormattedDate(), bill.getTotalString(),
                    (bill.getClient().getName() + " " + bill.getClient().getLastName())));
        }

        return simpleBills;
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        billsRepo.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/total_bills")
    public Integer totalBills() {

        return billsRepo.findAll().size();
    }

}
