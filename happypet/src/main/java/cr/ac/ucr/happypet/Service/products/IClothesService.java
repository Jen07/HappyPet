package cr.ac.ucr.happypet.Service.products;
import java.util.List;

import cr.ac.ucr.happypet.Model.products.Clothes;


public interface IClothesService {

    List<Clothes> listarTodo();
    void save(Clothes a);
    void delete(int id);
    Clothes findById(int id);
    
}
