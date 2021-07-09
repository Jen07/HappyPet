package cr.ac.ucr.happypet.Controller.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import cr.ac.ucr.happypet.Bussines.LogicProduct;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.products.Clothes;
import cr.ac.ucr.happypet.Service.products.IClothesService;

@RestController
@RequestMapping("/clothes")
public class Clothes_Controller extends MainController {

    @Autowired
    private IClothesService svClothes;
    private LogicProduct log = new LogicProduct();

    @RequestMapping("/inicio")
    public ModelAndView inicio() {
        ModelAndView view = new ModelAndView();
        view.setViewName("products/clothes/list");
        return view;
    }

    @PostMapping("/delete")
    public String delete(@RequestParam int codigo) {
        svClothes.delete(codigo);
        return "Elimino";
    }

    @RequestMapping("/listar")
    public ResponseEntity<List<Clothes>> name() {
        List<Clothes> lista = svClothes.listarTodo();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @RequestMapping("/showAdd")
    public ModelAndView showAdd() {
        ModelAndView view = new ModelAndView();
        view.setViewName("products/clothes/add");
        return view;
    }

    @GetMapping("/detail/{codigo}")
    public Clothes getDetail(@PathVariable int codigo) {
        System.out.println("Dtalle ropa");
        return  svClothes.findById(codigo);
    }

    //search

    @PostMapping("/search")
	public List<Clothes> search(@RequestParam String text, @RequestParam String filtro) {
		return log.search(svClothes.listarTodo(), text, filtro);
	}


    @PostMapping("/add")
    public String saveClothes(@RequestParam String name, @RequestParam int price, @RequestParam String description,
            @RequestParam("type") String type_animal, @RequestParam String color, @RequestParam String size,
            @RequestParam boolean availability) {

        Clothes c = new Clothes(name, price, description, type_animal, size, color, availability);
        svClothes.save(c);

        return "Agregado";
    }

}
