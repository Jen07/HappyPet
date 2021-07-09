package cr.ac.ucr.happypet.Service.animals.breeds_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Breed;
import cr.ac.ucr.happypet.Repository.animals.BreedsRepository;

@Service
public class BreedServiceImp implements IBreedsService{

    @Autowired
    BreedsRepository repo;

    @Override
    public List<Breed> getAll() {
        return repo.findAll();
    }
    
    @Override
    public List<Breed> getBySpecie(String specie) {
        return repo.findBySpecie(specie);
    }

}
