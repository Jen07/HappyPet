package cr.ac.ucr.happypet.Model.products;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String type;
    private long size;
    private byte[] pixel;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    public ProductImage(){}

    public ProductImage(int id, String name, String type, long size, byte[] pixel, Product product) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.pixel = pixel;
        this.product = product;
    }

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    
}
