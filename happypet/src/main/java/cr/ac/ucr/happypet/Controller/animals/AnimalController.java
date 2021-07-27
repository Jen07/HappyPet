package cr.ac.ucr.happypet.Controller.animals;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cr.ac.ucr.happypet.Service.animals.animals_service.IAnimalsService;
import cr.ac.ucr.happypet.Service.animals.breeds_service.IBreedsService;
import cr.ac.ucr.happypet.Service.animals.images_service.IImagesService;
import cr.ac.ucr.happypet.Service.animals.registers_service.IRegistersService;
import cr.ac.ucr.happypet.Service.animals.services_service.IServicesService;
import cr.ac.ucr.happypet.Service.animals.species_service.ISpeciesService;
import cr.ac.ucr.happypet.Service.users.IUserService;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.animals.Animal;
import cr.ac.ucr.happypet.Model.animals.Breed;
import cr.ac.ucr.happypet.Model.animals.Register;
import cr.ac.ucr.happypet.Model.animals.Specie;
import cr.ac.ucr.happypet.Model.users.User;

@Controller
@RequestMapping(value = "/animal")
public class AnimalController extends MainController {

	@Autowired
	IBreedsService breedsRepo;

	@Autowired
	ISpeciesService speciesRepo;

	@Autowired
	IUserService usersRepo;

	@Autowired
	IAnimalsService animalsRepo;

	@Autowired
	IRegistersService registersRepo;

	@Autowired
	IServicesService servicesRepo;

	@Autowired
	IImagesService imagesRepo;

	@GetMapping("/list_animals/{type}")
	public String listAnimals(Model mod, @PathVariable String type) {

		if (type.equals("adopt")) {
			List<Animal> adopt = animalsRepo.findByType('A');
			mod.addAttribute("adopt", adopt);
		} else {
			List<Animal> sale = animalsRepo.findByType('S');
			mod.addAttribute("sale", sale);
		}
		mod.addAttribute("type", type);
		return "animals/list_animals";
	}

	@GetMapping({ "/", "/index", "/home" })
	public String home() {
		return "animals/home";
	}

	@GetMapping("/my_animals/{id}")
	public String myanimals(Model mod, @PathVariable Integer id) {

		List<Animal> animals = animalsRepo.findByOwner(id);
		mod.addAttribute("animals", animals);
		return "animals/my_animals";
	}

	@GetMapping("/details/{id}")
	public String details(Model mod, @PathVariable final Integer id) {

		mod.addAttribute("services", servicesRepo.findByRegisterId(id));

		mod.addAttribute("animal", animalsRepo.findById(id));
		return "animals/get_details";
	}

	@GetMapping(value = "/gestion_animal")
	public String gestion(Model mod) {

		mod.addAttribute("filterBy", "Nombre");
		return "animals/gestion_animal";
	}

	@GetMapping("/modify_form")
	public String modify(Model mod, @RequestParam("id") final Integer id) {

		Animal animal = animalsRepo.findById(id);
		List<Specie> species = speciesRepo.getAll();
		List<Breed> breeds = breedsRepo.getAll();
		Register register = registersRepo.findById(id);

		mod.addAttribute("register", register);
		mod.addAttribute("animal", animal);
		mod.addAttribute("species", species);
		mod.addAttribute("breeds", breeds);
		if (animal.getRegisterId().getOwner() != 0) {
			mod.addAttribute("owner", usersRepo.findById(animal.getRegisterId().getOwner()));
		}
		return "animals/modify";
	}

	@GetMapping("/modify")
	public String modify(Model mod, Animal animal) {
		animalsRepo.update(animal);
		return "redirect:/animal/gestion_animal/";
	}

	@GetMapping("/register_form/{register_type}")
	public String register(Model mod, @PathVariable("register_type") final String type) {

		if (type.equals("user")) {
			List<User> users = usersRepo.getAll();
			mod.addAttribute("users", users);
		}

		mod.addAttribute("species", speciesRepo.getAll());
		mod.addAttribute("register_type", type);

		return "animals/register";
	}

	@RequestMapping("/register")
	public String register(Model mod, Animal animal, Register register) {

		animal.setRegisterId(register);
		registersRepo.save(register);
		animalsRepo.save(animal);

		return "redirect:/animal/gestion_animal/";
	}

	@GetMapping("/reset_filter")
	public String resetFilter(@RequestParam String filterBy, Model mod) {

		switch (filterBy) {
			case "Especie":
				mod.addAttribute("species", speciesRepo.getAll());
				break;

			case "Raza":
				mod.addAttribute("breeds", breedsRepo.getAll());
				break;
		}

		mod.addAttribute("filterBy", filterBy);

		return "animals/fragments/filter_gestion";
	}

	@GetMapping("/delete/{id}")
	public String deleteAnimal(@PathVariable("id") final Integer id, Model mod) {
		mod.addAttribute("animalName", animalsRepo.findById(id).getName());
		imagesRepo.deleteAll(imagesRepo.findByAnimalId(id));
		animalsRepo.delete(animalsRepo.findById(id));
		registersRepo.delete(registersRepo.findById(id));
		return "animals/fragments/animal_name";
	}

	@GetMapping("/get_animal/{id}")
	public String getAnimal(@PathVariable int id, Model mod) {
		mod.addAttribute("animalName", animalsRepo.findById(id).getName());
		return "animals/fragments/animal_name";
	}

	@GetMapping("/getbreeds")
	public String getBreeds(@RequestParam final String specie, Model mod) {

		mod.addAttribute("breeds", breedsRepo.getBySpecie(specie));
		return "animals/fragments/breeds_options";
	}

	@GetMapping(value = "/filter_users")
	public String getMethodName(Model mod, @RequestParam(required = false) final String filter) {
		List<User> users = new LinkedList<>();

		try {
			users.add(usersRepo.findById(Integer.parseInt(filter)));
		} catch (NumberFormatException e) {
			users = usersRepo.findByName(filter);
		}

		mod.addAttribute("users", users);
		return "animals/fragments/user_options";
	}

	@GetMapping("/get_images_form/{id}")
	public String getImagesForm(@PathVariable int id, Model mod) {
		mod.addAttribute("id", id);
		return "animals/fragments/image_form";
	}
}