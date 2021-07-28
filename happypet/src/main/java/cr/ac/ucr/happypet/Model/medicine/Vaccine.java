package cr.ac.ucr.happypet.Model.medicine;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="tb_Vaccine")
@PrimaryKeyJoinColumn(referencedColumnName ="queryCode")
public class Vaccine extends Medicina{


    private String vaccineName;
    private String disease;
    private Date nextDate;

    
    
    public Vaccine(int queryCode, String type, Date date, String description, int idAnimal, String vaccineName,
            String disease, Date nextDate) {
        super(queryCode, type, date, description, idAnimal);
        this.vaccineName = vaccineName;
        this.disease = disease;
        this.nextDate = nextDate;
    }


    public String getVaccineName() {
        return vaccineName;
    }


    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }


    public String getDisease() {
        return disease;
    }


    public void setDisease(String disease) {
        this.disease = disease;
    }


    public Date getNextDate() {
        return nextDate;
    }


    public void setNextDate(Date nextDate) {
        this.nextDate = nextDate;
    }

    
    


    
}
