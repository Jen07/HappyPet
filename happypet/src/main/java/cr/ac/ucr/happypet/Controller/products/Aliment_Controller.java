package cr.ac.ucr.happypet.Controller.products;

import java.util.LinkedList;
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
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Bussines.LogicProduct;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.products.Aliment;
import cr.ac.ucr.happypet.Service.products.IAlimentService;
import cr.ac.ucr.happypet.Service.products.IImagenesServiceProduct;

@RestController
@RequestMapping("/aliment")
public class Aliment_Controller extends MainController {

    @Autowired
    private IAlimentService svAliment;
    private LogicProduct log = new LogicProduct();

    @Autowired
    private IImagenesServiceProduct svImages;


    // muestra la vista del producto
    @RequestMapping("/inicio")
    public ModelAndView inicio() {
        ModelAndView view = new ModelAndView();
        view.setViewName("products/aliment/list");
        return view;
    }

    // Lista todo los producto alimento
    @RequestMapping("/listar")
    public ResponseEntity<List<Aliment>> listar() {
        List<Aliment> lista =  new LinkedList<>();;

        for (Aliment a : svAliment.listarTodo()) {
            Aliment aliment = new Aliment(a.getCod_product(), a.getName(), a.getPrice(), 
            a.getDescription(), a.getType_animal(), a.getBrand(), a.getSize());
            lista.add(aliment);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // Elimina
    @PostMapping("/delete")
    public String delete(@RequestParam int codigo) {

        svImages.deleteAll(svAliment.findById(codigo).getImages());
        svAliment.delete(codigo);
        return "Elimino";
    }

    // lo manda la html de agregar
    @RequestMapping("/showAdd")
    public ModelAndView showAdd() {
        ModelAndView view = new ModelAndView();
        view.setViewName("products/aliment/add");
        return view;
    }

    @PostMapping("/search")
    public List<Aliment> search(@RequestParam String text, @RequestParam String filtro) {

        List<Aliment> lista =  new LinkedList<>();;

        for (Aliment a : svAliment.listarTodo()) {
            Aliment aliment = new Aliment(a.getCod_product(), a.getName(), a.getPrice(), 
            a.getDescription(), a.getType_animal(), a.getBrand(), a.getSize());
            lista.add(aliment);
        }

        return log.searchA(lista, text, filtro);
    }

    @GetMapping("/detail/{codigo}")
    public Aliment getDetail(@PathVariable int codigo) {

        Aliment a=svAliment.findById(codigo);

        Aliment aliment = new Aliment(a.getCod_product(), a.getName(), a.getPrice(), 
            a.getDescription(), a.getType_animal(), a.getBrand(), a.getSize());

        return aliment;
    }

     // Direciona a paguina Editar
	@RequestMapping(value = "getEdit", method = RequestMethod.GET)
	public ModelAndView getEdit(@RequestParam("id") int id, Model model) {//
		model.addAttribute("producto", svAliment.findById(id));

		ModelAndView view = new ModelAndView();
		view.setViewName("/products/aliment/edit");
        return view;
    }

    // AGregar
    @PostMapping("/add")
    public String saveAliment(@RequestParam String name, @RequestParam int price,
     @RequestParam String description,@RequestParam String type_animal, 
     @RequestParam String brand, @RequestParam String size) {

        Aliment a = new Aliment(name, price, description, type_animal, brand, size);
        svAliment.save(a);
        return "Agregado";
    }



    @PostMapping("/edit") // sin foto
    public String editSinImagen(@RequestParam int cod_product,@RequestParam String name,
    @RequestParam int price,@RequestParam String description,@RequestParam String type_animal, 
    @RequestParam String brand, @RequestParam String size){

        System.out.println("entra--------------------------------");
        Aliment aliment = new Aliment(cod_product, name, price, description, type_animal, brand, size);
        svAliment.edit(cod_product, aliment);
        return "Listo";
    }
    /*********************************************/

}
