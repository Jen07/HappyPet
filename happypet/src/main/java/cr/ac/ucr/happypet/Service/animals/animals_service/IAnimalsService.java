package cr.ac.ucr.happypet.Service.animals.animals_service;

import java.util.List;

import cr.ac.ucr.happypet.Model.animals.Animal;

public interface IAnimalsService {

    void save(Animal animal);
    void update(Animal animal);
    void delete(Animal animal);

    List<Animal> findAll();
    List<Animal> findByOwner(int owner);
    List<Animal> findByType(char type);
    
    Animal findById(int id);
    List<Animal> findByName(String name);
    List<Animal> findBySpecie(String filter);
    List<Animal> findByBreed(String filter);
}
