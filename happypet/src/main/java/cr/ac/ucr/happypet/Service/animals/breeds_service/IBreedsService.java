package cr.ac.ucr.happypet.Service.animals.breeds_service;

import java.util.List;

import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Breed;

@Service
public interface IBreedsService {

    List<Breed> getBySpecie(String specie);
    List<Breed> getAll();

}
