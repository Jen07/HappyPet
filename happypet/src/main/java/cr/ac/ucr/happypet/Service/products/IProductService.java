package cr.ac.ucr.happypet.Service.products;
import java.util.List;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Producer;

import cr.ac.ucr.happypet.Model.products.Product;


public interface IProductService {


    List<Product> listarTodo();
    void save(Product p);
    void delete(int id);
    
}
