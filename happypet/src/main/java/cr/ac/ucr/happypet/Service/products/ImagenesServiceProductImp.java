package cr.ac.ucr.happypet.Service.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cr.ac.ucr.happypet.Model.products.ProductImage;
import cr.ac.ucr.happypet.Repository.products.ImagenProduct_Repository;

@Service
public class ImagenesServiceProductImp implements IImagenesServiceProduct {

    @Autowired
    ImagenProduct_Repository repo;


    @Override
    public List<ProductImage> findAll() {
        return repo.findAll();
    }

    @Override
    public ProductImage findById(int id) {
        return repo.findById(id).get();
    }

    @Override
    public void delete(int id) {
        repo.deleteById(id);
    }

    @Override
    public ProductImage save(ProductImage img) {
        return repo.save(img);
    }

    @Override
    public void deleteAll(List<ProductImage> img) {
        repo.deleteAll(img);
    }

}
