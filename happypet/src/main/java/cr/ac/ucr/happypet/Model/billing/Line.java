package cr.ac.ucr.happypet.Model.billing;

import java.text.DecimalFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import cr.ac.ucr.happypet.Model.products.Product;


@Entity
@Table (name = "tb_lines")
public class Line {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long line;

    @ManyToOne
    @JoinColumn(name = "idBill")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    private int quantity;

    public long getLine() {
        return line;
    }

    public void setLine(long id) {
        this.line = id;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getTotalString() {
        DecimalFormat format = new DecimalFormat("#,###.00");
        String formatted = format.format(getTotal());
        return (String.format("₡%s", formatted));
    }

    public int getTotal() {
        return (quantity * product.getPrice());
    }

    public void addQuantity(int quantity){
        this.quantity += quantity;
    }
    
    public void subQuantity(int quantity){
        this.quantity -= quantity;
    }
    
}
