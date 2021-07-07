package cr.ac.ucr.happypet.Controller.animals;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Model.animals.Image;
import cr.ac.ucr.happypet.Model.animals.SimpleAnimal;
import cr.ac.ucr.happypet.Service.animals.animals_service.IAnimalsService;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RestController
@RequestMapping(value = "/animal")
public class AnimalRest {

    @Autowired
    IAnimalsService animalsRepo;

    @Autowired
    IUserService usersRepo;

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

    @GetMapping("/get_animal_images/{id}")
    public List<Integer> getAnimalImages(@PathVariable final Integer id) {
        Animal animal = animalsRepo.findById(id);
        List<Integer> idImages = new LinkedList<>();

        for (Image img : animal.getImages()) {
            idImages.add(img.getId());
        }

        return idImages;
    }

    @GetMapping("/get_All")
    public List<SimpleAnimal> getAnimalImages() {

        List<SimpleAnimal> animals = new LinkedList<>();

        for (Animal simpleAnimal : animalsRepo.findAll()) {

            SimpleAnimal an = new SimpleAnimal(simpleAnimal.getId(), simpleAnimal.getRegisterId().getId(),
                    simpleAnimal.getName(), simpleAnimal.getBorn(), simpleAnimal.getGender(), simpleAnimal.getType(),
                    simpleAnimal.getSpecie(), simpleAnimal.getBreed(), simpleAnimal.getHeight(),
                    simpleAnimal.getWeight(), simpleAnimal.isNeutered(), "0");

            if (simpleAnimal.getRegisterId().getOwner() != 0) {
                an.setOwner(usersRepo.findById(simpleAnimal.getRegisterId().getOwner()).getName() + " "
                        + usersRepo.findById(simpleAnimal.getRegisterId().getOwner()).getLastName());
            }

            animals.add(an);
        }

        return animals;
    }

    @GetMapping("/filter_table")
    public List<SimpleAnimal> filterTable(@RequestParam String filterBy, String filter) {

        List<Animal> animals = null;

        switch (filterBy) {
            case "Especie":
                animals = animalsRepo.findBySpecie(filter);
                break;

            case "Raza":
                animals = animalsRepo.findByBreed(filter);
                break;

            case "Tipo":
                animals = animalsRepo.findByType(filter.charAt(0));
                break;

            case "Nombre":
                animals = animalsRepo.findByName(filter);
                break;
        }

        List<SimpleAnimal> simple = new LinkedList<>();

        for (Animal simpleAnimal : animals) {

            SimpleAnimal an = new SimpleAnimal(simpleAnimal.getId(), simpleAnimal.getRegisterId().getId(),
                    simpleAnimal.getName(), simpleAnimal.getBorn(), simpleAnimal.getGender(), simpleAnimal.getType(),
                    simpleAnimal.getSpecie(), simpleAnimal.getBreed(), simpleAnimal.getHeight(),
                    simpleAnimal.getWeight(), simpleAnimal.isNeutered(), "0");

            if (simpleAnimal.getRegisterId().getOwner() != 0) {
                an.setOwner(usersRepo.findById(simpleAnimal.getRegisterId().getOwner()).getName() + " "
                        + usersRepo.findById(simpleAnimal.getRegisterId().getOwner()).getLastName());
            }

            simple.add(an);
        }

        return simple;

    }

}
