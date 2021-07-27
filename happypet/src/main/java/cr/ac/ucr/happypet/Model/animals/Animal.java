package cr.ac.ucr.happypet.Model.animals;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author Luis Leiton Clase de animal
 */

@Entity
@Table(name = "tb_animals")

public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "registerId")
    private Register registerId;

    private String name;
    private Date born;
    private char gender;
    private char type;
    private String specie;
    private String breed;
    private int height;
    private int weight;
    private boolean neutered;

    @OneToMany(mappedBy = "animal")
    private List<Image> images;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Register getRegisterId() {
        return registerId;
    }

    public void setRegisterId(Register registerId) {
        this.registerId = registerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBorn() {
        return born;
    }

    public void setBorn(Date born) {
        this.born = born;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public char getType() {
        return type;
    }

    public void setType(char type) {
        this.type = type;
    }

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

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public boolean isNeutered() {
        return neutered;
    }

    public void setNeutered(boolean neutered) {
        this.neutered = neutered;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public String getFormattedDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        return format.format(born);
    }

    @Override
    public String toString() {
        return "Animal [born=" + born + ", breed=" + breed + ", gender=" + gender + ", height=" + height + ", id=" + id
                + ", images=" + images + ", name=" + name + ", neutered=" + neutered + ", registerId=" + registerId
                + ", specie=" + specie + ", type=" + type + ", weight=" + weight + "]";
    }

}