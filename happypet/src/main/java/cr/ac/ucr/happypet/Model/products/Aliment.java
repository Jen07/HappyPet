package cr.ac.ucr.happypet.Model.products;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(referencedColumnName ="cod_product")
public class Aliment extends Product{
    

    private String brand;
    private String size;
    
    public Aliment(){}

    public Aliment(String name, int price, String description, String type_animal, String brand, String size) {
        super(name, price, description, type_animal);
        this.brand = brand;
        this.size = size;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public String getSize() {
        return size;
    }
    
    public void setSize(String size) {
        this.size = size;
    }
    
    @Override
    public String toString() {
        return super.toString()+"aliment [brand=" + brand + ", size=" + size + "]";
    }



}
