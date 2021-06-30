package cr.ac.ucr.happypet.Service.products;
import java.util.List;

import cr.ac.ucr.happypet.Model.products.Product;


public interface IProductService {

    List<Product> listarTodo();
    void save(Product p);
    void delete(int id);
    
    Product findById(int id);
}
