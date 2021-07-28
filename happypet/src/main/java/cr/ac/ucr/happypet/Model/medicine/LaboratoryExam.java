package cr.ac.ucr.happypet.Model.medicine;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="tb_laboratoryExamen")
@PrimaryKeyJoinColumn(referencedColumnName ="queryCode")
public class LaboratoryExam extends Medicina {
    
    private String typeExam;
    private boolean state;

    public LaboratoryExam(int queryCode, String type, Date date, String description, int idAnimal, String typeExam,
            boolean state) {
        super(queryCode, type, date, description, idAnimal);
        this.typeExam = typeExam;
        this.state = state;
    }

    public String getTypeExam() {
        return typeExam;
    }

    public void setTypeExam(String typeExam) {
        this.typeExam = typeExam;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    


    

    



}
