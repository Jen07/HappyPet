package cr.ac.ucr.happypet.Model.animals;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name = "tb_animal_images")
public class Image {
 
    @Id
    private int id;

    private String name;
    private String type;
    private long size;
    private byte[] pixel;


    @ManyToOne
    @JoinColumn(name="animalId")
    private Animal animal;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public byte[] getPixel() {
        return pixel;
    }

    public void setPixel(byte[] pixel) {
        this.pixel = pixel;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
   
}