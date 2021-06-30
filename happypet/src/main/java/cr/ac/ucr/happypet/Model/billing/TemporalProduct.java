package cr.ac.ucr.happypet.Model.billing;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_temporal_product")
public class TemporalProduct {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date insertedAt;
    private int owner;
    private char state;
    private int quantity;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Date getInsertedAt() {
        return insertedAt;
    }
    public void setInsertedAt(Date insertedAt) {
        this.insertedAt = insertedAt;
    }
    public int getOwner() {
        return owner;
    }
    public void setOwner(int owner) {
        this.owner = owner;
    }
    public char getState() {
        return state;
    }
    public void setState(char state) {
        this.state = state;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}