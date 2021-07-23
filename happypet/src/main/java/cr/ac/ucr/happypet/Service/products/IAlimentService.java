package cr.ac.ucr.happypet.Service.products;

import java.util.List;

import cr.ac.ucr.happypet.Model.products.Aliment;


public interface IAlimentService {

    List<Aliment> listarTodo();
    void save(Aliment a);
    void delete(int id);
    Aliment findById(int id);
    void edit(int id,Aliment c);
    
}
