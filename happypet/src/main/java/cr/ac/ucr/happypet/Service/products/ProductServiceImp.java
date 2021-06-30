package cr.ac.ucr.happypet.Service.products;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.products.Product;
import cr.ac.ucr.happypet.Repository.products.Product_Repository;


@Service
public class ProductServiceImp implements IProductService{

    @Autowired
    private Product_Repository repo;

    @Override
    public List<Product> listarTodo(){
        return repo.findAll();
    }

    @Override
    public void save(Product p){
        repo.save(p);
    }

    @Override
    public void delete(int id){
        repo.deleteById(id);
    }
    
    @Override
    public Product findById(int id) {
        return repo.findById(id);
    }

    
}
