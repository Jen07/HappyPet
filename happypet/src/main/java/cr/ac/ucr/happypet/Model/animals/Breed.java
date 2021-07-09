package cr.ac.ucr.happypet.Model.animals;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "tb_breeds")
public class Breed{

    @Id
    private String breed;
    private String specie;
    
    public String getSpecie() {
        return specie;
    }

    public void setSpecie(String specie) {
        this.specie = specie;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    @Override
    public String toString() {
        return "Breed [breed=" + breed + ", specie=" + specie + "]\n";
    }

}