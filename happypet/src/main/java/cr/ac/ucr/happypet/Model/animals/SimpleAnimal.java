package cr.ac.ucr.happypet.Model.animals;

import java.io.Serializable;
import java.sql.Date;

/**
 * @author Luis Leiton Clase de animal
 */

public class SimpleAnimal implements Serializable {

    private int id;
    private int registerId;
    private String name;
    private Date born;
    private char gender;
    private char type;
    private String specie;
    private String breed;
    private int height;
    private int weight;
    private boolean neutered;
    private String owner;

    public SimpleAnimal(int id, int registerId, String name, Date born, char gender, char type, String specie,
            String breed, int height, int weight, boolean neutered, String owner) {
        this.id = id;
        this.registerId = registerId;
        this.name = name;
        this.born = born;
        this.gender = gender;
        this.type = type;
        this.specie = specie;
        this.breed = breed;
        this.height = height;
        this.weight = weight;
        this.neutered = neutered;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRegisterId() {
        return registerId;
    }

    public void setRegisterId(int registerId) {
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    

}