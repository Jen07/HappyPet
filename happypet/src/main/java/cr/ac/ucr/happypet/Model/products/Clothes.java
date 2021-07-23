package cr.ac.ucr.happypet.Model.products;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(referencedColumnName ="cod_product")
public class Clothes extends Product{
    
private String size; //talla
private String color;
private boolean availability;

public Clothes(){}


public Clothes(int cod_product, String name, int price, String description, String type_animal, String size,
        String color, boolean availability) {
    super(cod_product, name, price, description, type_animal);
    this.size = size;
    this.color = color;
    this.availability = availability;
}


public Clothes(String name, int price, String description, String type_animal, String size, String color,
        boolean availability) {
    super(name, price, description, type_animal);
    this.size = size;
    this.color = color;
    this.availability = availability;
}

public String getSize() {
    return size;
}

public void setSize(String size) {
    this.size = size;
}

public String getColor() {
    return color;
}

public void setColor(String color) {
    this.color = color;
}

public boolean isAvailability() {
    return availability;
}

public void setAvailability(boolean availability) {
    this.availability = availability;
}

@Override
public String toString() {
    return super.toString()+"Clothes [availability=" + availability + ", color=" + color + ", size=" + size + "]";
}



}
