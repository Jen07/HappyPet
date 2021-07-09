package cr.ac.ucr.happypet.Service.animals.species_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Specie;
import cr.ac.ucr.happypet.Repository.animals.SpeciesRepository;

@Service
public class SpeciesServiceImp implements ISpeciesService {

    @Autowired
    SpeciesRepository repo;

    @Override
    public List<Specie> getAll() {
        return repo.findAll();
    }
}
