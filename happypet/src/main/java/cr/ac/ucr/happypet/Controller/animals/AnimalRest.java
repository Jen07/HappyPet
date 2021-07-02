package cr.ac.ucr.happypet.Controller.animals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Service.animals.animals_service.IAnimalsService;

@RestController
@RequestMapping(value = "/animal")
public class AnimalRest {

    @Autowired
    IAnimalsService animalsRepo;

    @GetMapping("/getDetails/{id}")
    public Animal details(@PathVariable final Integer id) {

        Animal animal = animalsRepo.findById(id);

        Animal response = new Animal();

        response.setName(animal.getName());
        response.setSpecie(animal.getSpecie());
        response.setBreed(animal.getBreed());
        response.setHeight(animal.getHeight());
        response.setWeight(animal.getWeight());
        response.setGender(animal.getGender());
        response.setNeutered(animal.isNeutered());

        return response;
    }

}
