package cr.ac.ucr.happypet.Repository.products;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import cr.ac.ucr.happypet.Model.products.Product;


public interface Product_Repository extends JpaRepositoryImplementation<Product,Integer>{
  
    Product findById(int id);

}
