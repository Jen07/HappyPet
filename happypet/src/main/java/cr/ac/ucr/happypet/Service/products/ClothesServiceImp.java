package cr.ac.ucr.happypet.Service.products;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.products.Clothes;
import cr.ac.ucr.happypet.Repository.products.Clothes_Repository;
import java.util.Optional;



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

    //EDITAR
	@Override
	public void edit(int id,Clothes c) {
         Optional<Clothes> opcional = repo.findById(id);
		  if (opcional.isPresent()) {
		       repo.save(c); 
		  }
	}


    
}
