package cr.ac.ucr.happypet.Model.products;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Product{
    
@Id   
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int cod_product;
private String name;
private int price;
private String description;
private String type_animal;

public Product(){}

public Product(String name, int price, String description, String type_animal) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.type_animal = type_animal;
}

public int getCod_product() {
    return cod_product;
}


public void setCod_product(int cod_product) {
    this.cod_product = cod_product;
}


public String getName() {
    return name;
}


public void setName(String name) {
    this.name = name;
}


public int getPrice() {
    return price;
}


public void setPrice(int price) {
    this.price = price;
}


public String getDescription() {
    return description;
}


public void setDescription(String description) {
    this.description = description;
}


public String getType_animal() {
    return type_animal;
}


public void setType_animal(String type_animal) {
    this.type_animal = type_animal;
}

@Override
public String toString() {
    return "Product [cod_product=" + cod_product + ", description=" + description + ", name=" + name + ", price="
            + price + ", type_animal=" + type_animal + "]";
}



}
