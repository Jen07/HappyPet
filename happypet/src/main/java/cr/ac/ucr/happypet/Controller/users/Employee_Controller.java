package cr.ac.ucr.happypet.Controller.users;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Bussines.Logic;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.users.Employee;
import cr.ac.ucr.happypet.Service.users.IEmployeeService;

@RestController
@RequestMapping("/employee")
public class Employee_Controller extends MainController{

	@Autowired
	private IEmployeeService svEmployee;

	private Logic log = new Logic();

	/*Ingresa a cuenta employee*/	
	@RequestMapping("/inicio")
	public ModelAndView checkLogin(){		
		ModelAndView view = new ModelAndView();
		view.setViewName("/users/employee/list_employee");/***************----- */
		return view;
	}

	@RequestMapping("/listar")
	public ResponseEntity<List<Employee>> listar() {
		List<Employee> lista = svEmployee.listaTodo();
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}

	/* Obtiene la información del empleado a mostrar en detalles */
	@PostMapping("/detail")
	public ModelAndView getDetailEmployee(@RequestParam int id, Model model) {
		model.addAttribute("employee", svEmployee.findByid(id));

		ModelAndView view = new ModelAndView();
		view.setViewName("/users/employee/div_Detail");
		return view;
	}

	/* Obtiene la información del empleado a mostrar en detalles */
	@GetMapping("/detail2/{id}")
	public Employee getDetailEmployee2(@PathVariable int id) {
		return svEmployee.findByid(id);
	}

	/* Elimina al Empleado */
	@PostMapping("/delete")
	public String delete(@RequestParam int id, Model model) {
		svEmployee.delete(id);
		return "Elimino";
	}

	/* lo direcciona a la pagina de agregar un nuevo Empleado */
	@RequestMapping(value = "addPagina", method = RequestMethod.GET)
	public ModelAndView addEmPagina(Model model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/users/employee/addEmployee");
		return view;
	}

	// Direciona a paguina Editar 
	@RequestMapping(value = "getEdit", method = RequestMethod.GET)
	public ModelAndView getEdit(@RequestParam("id") int id, Model model) {//
		model.addAttribute("e", svEmployee.findByid(id));

		ModelAndView view = new ModelAndView();
		view.setViewName("/users/employee/edit_employee");
		return view;
	}

	
	// Editar Empleado 
	
	@PostMapping("/edit") // con foto
	public String edit(@RequestParam("id") int id, @RequestParam("name") String name,
			@RequestParam("lastName") String lastName, @RequestParam("salary") int salary,
			@RequestParam("tel") String tel, @RequestParam("type") String type, @RequestParam("passw") String passw,
			@RequestParam("address") String address, @RequestParam("mail") String mail,
			@RequestParam("imagen") MultipartFile imagen) {

		try {
			if (!imagen.isEmpty()) {
				Path addressImagen = Paths.get("src//main//resources//static//users/imageEmployee");
				String addresAbsolute = addressImagen.toFile().getAbsolutePath();
				byte[] byteImagen;
				byteImagen = imagen.getBytes();
				Path allAddress = Paths.get(addresAbsolute + "//" + imagen.getOriginalFilename());
				Files.write(allAddress, byteImagen);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Employee e = new Employee(id, name, lastName, passw, mail, tel, address, imagen.getOriginalFilename(), salary, type);
		svEmployee.edit(id, e);

		return "Listo";
	}

	@PostMapping("/edit2") // sin foto
	public String editSinImagen(@RequestParam("id") int id, @RequestParam("name") String name,
			@RequestParam("lastName") String lastName, @RequestParam("salary") int salary,
			@RequestParam("tel") String phone, @RequestParam("type") String type, @RequestParam("passw") String passw,
			@RequestParam("address") String address, @RequestParam("mail") String mail,
			@RequestParam("oldImage") String imagen) {
			
		Employee e = new Employee();
		if (imagen.equals("")) {
			e = new Employee(id, name, lastName, passw, mail, phone, address, salary, type);
		} else {
			e = new Employee(id, name, lastName, passw, mail, phone, address, imagen, salary, type);
		}

		svEmployee.edit(id, e);

		return "Listo";
	}

	
	@PostMapping("/add")
	public String add(@RequestParam("id") int id, @RequestParam("name") String name,
			@RequestParam("lastName") String lastName, @RequestParam("salary") int salary,
			@RequestParam("tel") String tel, @RequestParam("type") String type, @RequestParam("passw") String passw,
			@RequestParam("address") String address, @RequestParam("mail") String mail,
			@RequestParam("imagen") MultipartFile imagen) {

		try {
			if (!imagen.isEmpty()) {
				Path addressImagen = Paths.get("src//main//resources//static//users/imageEmployee");
				String addresAbsolute = addressImagen.toFile().getAbsolutePath();
				System.out.println(addresAbsolute);
				byte[] byteImagen;
				byteImagen = imagen.getBytes();
				Path allAddress = Paths.get(addresAbsolute + "//" + imagen.getOriginalFilename());
				Files.write(allAddress, byteImagen);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		Employee e = new Employee(id, name, lastName, passw, mail, tel, address, imagen.getOriginalFilename(), salary, type);
		svEmployee.save(e);

		return "Agregado";
	}

	// añadir sin imagen
	@PostMapping("/add2")
	public String add(@RequestParam("id") int id, @RequestParam("name") String name,
			@RequestParam("lastName") String lastName, @RequestParam("salary") int salary,
			@RequestParam("tel") String tel, @RequestParam("type") String type, @RequestParam("passw") String passw,
			@RequestParam("address") String address, @RequestParam("mail") String mail) {

		Employee e = new Employee(id, name, lastName, passw, mail, tel, address, salary, type);
		System.out.println(e.toString());
		svEmployee.save(e);

		return "Agregado";
	}

	@PostMapping("/search")
	public ModelAndView search(@RequestParam String text, @RequestParam String filtro, Model model) {
		model.addAttribute("employee", log.search(svEmployee.listaTodo(), text, filtro));
		ModelAndView view = new ModelAndView();
		view.setViewName("/users/employee/div");
		return view;
	}

}
