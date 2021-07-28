package cr.ac.ucr.happypet.Model.products;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cod_product;
    private String name;
    private int price;
    private String description;
    private String type_animal;


    @OneToMany(mappedBy = "product")
    private List<ProductImage> images;

    public Product() {
    }

    public Product(int cod_product, String name, int price, String description, String type_animal,
            List<ProductImage> images) {
        this.cod_product = cod_product;
        this.name = name;
        this.price = price;
        this.description = description;
        this.type_animal = type_animal;
        this.images = images;
    }

    public Product(int cod_product, String name, int price, String description, String type_animal) {
        this.cod_product = cod_product;
        this.name = name;
        this.price = price;
        this.description = description;
        this.type_animal = type_animal;
    }

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


    public List<ProductImage> getImages() {
        return images;
    }


    public void setImages(List<ProductImage> images) {
        this.images = images;
    }


    @Override
    public String toString() {
        return "Product [cod_product=" + cod_product + ", description=" + description + ", name=" + name + ", price="
                + price + ", type_animal=" + type_animal + "]";
    }

    public String getTotalString() {
        DecimalFormat format = new DecimalFormat("#,###.00");
        String formatted = format.format(getPrice());
        return (String.format("₡%s", formatted));
    }

}
