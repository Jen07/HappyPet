package cr.ac.ucr.happypet.Service.billing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Model.billing.Line;

@Component
public class EmailServiceImp {

   
    private JavaMailSender emailSender;

    public void sendMail(String body) {

        MimeMessagePreparator message = mimeMessage -> {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
            helper.setTo("Luis.leiton.cr@gmail.com");
            helper.setFrom("Luis.leiton.cr@gmail.com");
            helper.setSubject("Factura");
            helper.setText(body, true);
        };
        emailSender.send(message);
    }

    public String getBillTemplate(Bill bill) {

        // 1 Numero de factura
        // 2 Cliente
        // 3 Fecha
        String head = String.format(
                "<div style='background-color: #80BD5D; padding: 1em;'> <h1 style='color: #fcfcfc;text-align: center;'>Happy Pet</h1> </div> <div style='background-color: #fcfcfc; margin: 0;'> <h2 style='margin: 0; padding: 1em; text-align: center;'>Factura #<span>%s</span></h2> <p style='margin: 0; padding: 1em;'>Cliente: <span>%s</span> </p> <p style='margin: 0; padding: 1em;'>Fecha: <span>%s</span></p> <h2 style='margin: 0; padding: 1em; text-align: center;'>Detalle</h2> <table style='width: 100%% ; border-collapse: collapse;'> <thead style='background-color: #80BD5D; color:#fcfcfc;'> <tr style='text-align: center;'> <th style='padding: 1em;'> Nombre </th> <th> Descripcion </th> <th> Precio unitario </th> <th> Unidades </th> <th> Precio total </th> </tr> </thead> <tbody> ",
                bill.getId(), bill.getClient().getName(), bill.getFormattedDate());

        // 1 Nombre
        // 2 Descripcion
        // 3 Precio
        // 4 Cantidad
        // 5 Total
        String body = "";

        for (Line ln : bill.getLines()) {
            body += String.format(
                    "<tr style='text-align: center;'> <td style='padding: .5em;'>%s</td> <td >%s</td> <td>%s</td><td>%s</td> <td>%s</td> </tr> ",
                    ln.getProduct().getName(), ln.getProduct().getDescription(), ln.getProduct().getTotalString(),
                    ln.getQuantity(), ln.getTotalString());
        }

        // 1 Total
        String foot = String.format(
                "</tbody><tfoot> <tr> <td colspan='4' style='text-align: right; padding: 1em;'> Total: </td> <td style='text-align: center;'>%s </td> </tr> </tfoot> </table> </div></div>",
                bill.getTotalString());
        return head + body + foot;

    }
}