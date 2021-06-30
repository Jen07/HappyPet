package cr.ac.ucr.happypet.Controller.products;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Model.products.Aliment;
import cr.ac.ucr.happypet.Service.products.IAlimentService;


@RestController
@RequestMapping("/aliment")
public class Aliment_Controller {

    @Autowired
    private IAlimentService svAliment;

    //muestra la vista del producto
    @RequestMapping("/inicio")
    public ModelAndView inicio() {
        ModelAndView view = new ModelAndView();
		view.setViewName("aliment/list");
        return view;
    }

    //Lista todo los producto alimento
    @RequestMapping("/listar")
    public ResponseEntity<List<Aliment>> listar() {
        List<Aliment> lista= svAliment.listarTodo();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    //  Elimina
    @PostMapping("/delete")
    public String delete(@RequestParam int codigo) {
        svAliment.delete(codigo);
        return "Elimino";
    }

    // lo manda la html de agregar
    @RequestMapping("/showAdd")
    public ModelAndView showAdd() {
        ModelAndView view = new ModelAndView();
		view.setViewName("aliment/add");
        return view;
    }

    //aGregar
    @PostMapping("/add")
    public String saveAliment(@RequestParam String name,@RequestParam int price,@RequestParam String description,
    @RequestParam("type") String type_animal,@RequestParam String brand,@RequestParam String size) {    
        
        Aliment a = new Aliment(name, price, description, type_animal, brand, size);
        svAliment.save(a);
        return "Agregado";
    }

    //Muesta los detalles de alimentos
    @PostMapping("/detail")
	public ModelAndView getDetail(@RequestParam int codigo, Model model) {
		model.addAttribute("p", svAliment.findById(codigo));

		ModelAndView view = new ModelAndView();
		view.setViewName("/aliment/divDetail");
		return view;
	}



  


    
}
