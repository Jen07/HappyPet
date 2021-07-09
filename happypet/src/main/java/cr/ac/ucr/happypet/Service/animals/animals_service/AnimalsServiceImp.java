package cr.ac.ucr.happypet.Service.animals.animals_service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Repository.animals.AnimalsRepository;

@Service
public class AnimalsServiceImp implements IAnimalsService {

    @Autowired
    AnimalsRepository repo;

    @Override
    public void save(Animal animal) {
        repo.save(animal);
    }

    @Override
    public void update(Animal animal) {

        Optional<Animal> optional = repo.findById(animal.getId());

        if (optional.isPresent()) {
            Animal temp = optional.get();

            temp.setName(animal.getName());
            temp.setBorn(animal.getBorn());
            temp.setGender(animal.getGender());
            temp.setType(animal.getType());
            temp.setSpecie(animal.getSpecie());
            temp.setBreed(animal.getBreed());
            temp.setHeight(animal.getHeight());
            temp.setWeight(animal.getWeight());
            temp.setNeutered(animal.isNeutered());

            repo.save(temp);

        }
    }

    @Override
    public List<Animal> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Animal> findByType(char type) {
        return repo.findByType(type);
    }

    @Override
    public Animal findById(int id) {
        Optional<Animal> optional = repo.findById(id);

        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public List<Animal> findByOwner(int owner) {
        return repo.findByOwner(owner);
    }

    @Override
    public void delete(Animal animal) {
        repo.delete(animal);
    }

    @Override
    public List<Animal> findByName(String name) {

        return repo.findByNameStartingWith(name);
    }

    @Override
    public List<Animal> findBySpecie(String filter) {
        return repo.findBySpecie(filter);
    }

    @Override
    public List<Animal> findByBreed(String filter) {
        return repo.findByBreed(filter);
    }

    @Override
    public List<Animal> findReversedAll() {

        return repo.findAllByOrderByIdDesc();
    }

}