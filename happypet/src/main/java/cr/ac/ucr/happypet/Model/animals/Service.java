
package cr.ac.ucr.happypet.Model.animals;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import cr.ac.ucr.happypet.Model.billing.Bill;

/**  
    @author Luis Leiton
    Esta es la clase de servicio recibido
    Se guardara en los registros de la mascota.
 */

 @Entity
 @Table (name = "tb_services")

public class Service {
  
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    
    private int registerId;

    private double price;
    private Date receivedAt;
    private String description;
    

    @ManyToOne
    @JoinColumn(name = "bill")
    private  Bill bill;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public int getRegisterId() {
        return registerId;
    }
    public void setRegisterId(int registerId) {
        this.registerId = registerId;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public Date getReceivedAt() {
        return receivedAt;
    }
    public void setReceivedAt(Date receivedAt) {
        this.receivedAt = receivedAt;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    @Override
    public String toString() {
        return "Service description=" + description + ", id=" + id + ", price=" + price + ", received_at="
                + receivedAt + ", registerId=" + registerId + ", title=" + title + "\n";
    }
       
}
