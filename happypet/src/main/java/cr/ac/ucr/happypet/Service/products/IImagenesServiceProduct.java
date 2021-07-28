package cr.ac.ucr.happypet.Service.products;

import java.util.List;

import cr.ac.ucr.happypet.Model.products.ProductImage;

public interface IImagenesServiceProduct {

    List<ProductImage> findAll();
    void delete(int id);
    ProductImage findById(int id);
    ProductImage save(ProductImage img);
    void deleteAll(List<ProductImage> img);
    
}
