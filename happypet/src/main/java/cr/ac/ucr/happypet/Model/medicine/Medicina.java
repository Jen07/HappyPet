package cr.ac.ucr.happypet.Model.medicine;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;



@Entity
@Table(name = "tb_Medicine")
@Inheritance(strategy = InheritanceType.JOINED)
public class Medicina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int queryCode;
    private String type;
    private Date date;
    private String description;
    private int idAnimal;


    public Medicina(int queryCode, String type, Date date, String description, int idAnimal) {
        this.queryCode = queryCode;
        this.type = type;
        this.date = date;
        this.description = description;
        this.idAnimal = idAnimal;
    }


    public int getQueryCode() {
        return queryCode;
    }


    public void setQueryCode(int queryCode) {
        this.queryCode = queryCode;
    }


    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public Date getDate() {
        return date;
    }


    public void setDate(Date date) {
        this.date = date;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public int getIdAnimal() {
        return idAnimal;
    }


    public void setIdAnimal(int idAnimal) {
        this.idAnimal = idAnimal;
    }


    


    
}
