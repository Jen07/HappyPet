package cr.ac.ucr.happypet.Service.products;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.products.Clothes;
import cr.ac.ucr.happypet.Repository.products.Clothes_Repository;


@Service
public class ClothesServiceImp implements IClothesService{


    @Autowired
    private Clothes_Repository repo;

    @Override
    public List<Clothes> listarTodo() {
        return repo.findAll();
    }

    @Override
    public void save(Clothes a){
        repo.save(a);
    }

    @Override
    public void delete(int id){
        repo.deleteById(id);
    }

    @Override 
    public Clothes findById(int id){
        return repo.findById(id).get();
    }


    
}
