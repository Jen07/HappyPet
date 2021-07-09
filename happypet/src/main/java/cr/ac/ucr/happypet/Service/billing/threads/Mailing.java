package cr.ac.ucr.happypet.Service.billing.threads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Service.billing.EmailServiceImp;

@Component
public class Mailing implements Runnable {

    private String message;

    @Autowired
    private EmailServiceImp emailSender;

    public void sendBill(Bill bill) {
        message = emailSender.getBillTemplate(bill);
        new Thread(this).start();
    }

    @Override
    public void run() {
        emailSender.sendMail(message);
    }
}