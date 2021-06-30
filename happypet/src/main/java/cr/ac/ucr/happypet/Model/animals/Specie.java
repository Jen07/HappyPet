package cr.ac.ucr.happypet.Model.animals;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "tb_species")
public class Specie {
    
    @Id
    private String specie;
    
    public String getSpecie() {
        return specie;
    }

    public void setSpecie(String specie) {
        this.specie = specie;
    }

    @Override
    
    public String toString() {
        return "Specie [specie=" + specie + "]";
    }
}
