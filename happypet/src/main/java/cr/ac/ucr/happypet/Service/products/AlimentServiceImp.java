package cr.ac.ucr.happypet.Service.products;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.products.Aliment;
import cr.ac.ucr.happypet.Repository.products.Aliment_Repository;


@Service
public class AlimentServiceImp implements IAlimentService{
    
    @Autowired
    private Aliment_Repository repo;

    @Override
    public List<Aliment> listarTodo(){
        return repo.findAll();
    }

    @Override
    public void save(Aliment a){
        repo.save(a);
    }

    @Override
    public void delete(int id){
        repo.deleteById(id);
    }

    @Override
    public Aliment findById(int id){
        return repo.findById(id).get();
    }


}
