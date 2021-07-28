package cr.ac.ucr.happypet.Controller.products;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import cr.ac.ucr.happypet.Bussines.LogicProduct;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.products.Clothes;
import cr.ac.ucr.happypet.Service.products.IClothesService;
import cr.ac.ucr.happypet.Service.products.IImagenesServiceProduct;

@RestController
@RequestMapping("/clothes")
public class Clothes_Controller extends MainController {

    @Autowired
    private IClothesService svClothes;
    private LogicProduct log = new LogicProduct();

    @Autowired
    private IImagenesServiceProduct svImages;
 

    @RequestMapping("/inicio")
    public ModelAndView inicio() {
        ModelAndView view = new ModelAndView();
        view.setViewName("products/clothes/list");
        return view;
    }

    @PostMapping("/delete")
    public String delete(@RequestParam int codigo) {
        svImages.deleteAll(svClothes.findById(codigo).getImages());
        svClothes.delete(codigo);
        return "Elimino";
    }

    @RequestMapping("/listar")
    public ResponseEntity<List<Clothes>> name() {
        List<Clothes> lista = new LinkedList<>();

        for (Clothes c : svClothes.listarTodo()) {
            Clothes clo=new Clothes(c.getCod_product(), c.getName(), c.getPrice(), 
            c.getDescription(), c.getType_animal(), c.getSize(), c.getColor(),c.isAvailability());
            lista.add(clo);
        }

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

        Clothes c=  svClothes.findById(codigo);


            Clothes clothe= new Clothes(c.getCod_product(), c.getName(), c.getPrice(), 
            c.getDescription(), c.getType_animal(), c.getSize(), c.getColor(), c.isAvailability());

        return clothe;
    }

    // search

    @PostMapping("/search")
    public List<Clothes> search(@RequestParam String text, @RequestParam String filtro) {

        List<Clothes> lista = new LinkedList<>();

        for (Clothes c : svClothes.listarTodo()) {
            Clothes clo=new Clothes(c.getCod_product(), c.getName(), c.getPrice(), 
            c.getDescription(), c.getType_animal(), c.getSize(), c.getColor(), c.isAvailability());
            lista.add(clo);
        }

        return log.search(lista, text, filtro);
    }

    // Direciona a paguina Editar
	@RequestMapping(value = "getEdit", method = RequestMethod.GET)
	public ModelAndView getEdit(@RequestParam("id") int id, Model model) {//
		model.addAttribute("producto", svClothes.findById(id));
        
        System.out.println(svClothes.findById(id));
        System.out.println(svClothes.findById(id).isAvailability());

		ModelAndView view = new ModelAndView();
		view.setViewName("/products/clothes/edit");
		return view;
	}

    @PostMapping("/add")
    public String saveClothes(@RequestParam String name, @RequestParam int price,
     @RequestParam String description,@RequestParam("type") String type_animal,
     @RequestParam String color, @RequestParam String size,@RequestParam boolean availability) {

        Clothes c = new Clothes(name, price, description, type_animal, size, color, availability);
        svClothes.save(c);

        return "Agregado";
    }

    @PostMapping("/edit") // sin foto
    public String editSinImagen(@RequestParam int cod_product,@RequestParam String name, @RequestParam int price,
    @RequestParam String description,@RequestParam("type") String type_animal,
    @RequestParam String color, @RequestParam String size,@RequestParam boolean availability) {

      Clothes c = new Clothes(cod_product, name, price, description, type_animal, size, color, availability);
      svClothes.edit(cod_product, c);
        return "Listo";
    }


     /****************************************************** */

    // Agrega con imagen
    @PostMapping("/add2")
    public String saveClothes2(@RequestParam String name, @RequestParam int price, @RequestParam String description,
            @RequestParam("type") String type_animal, @RequestParam String color, @RequestParam String size,
            @RequestParam boolean availability, @RequestParam("imagen") MultipartFile imagen) throws IOException {

        String result = "Agregado";
       
            String nombreImag = name+type_animal+size+price+ ".jpg"; ///cambiar
            if (!imagen.isEmpty()) {
                Path addressImagen = Paths.get("src//main//resources//static//users/imageEmployee");
                String addresAbsolute = addressImagen.toFile().getAbsolutePath();
                System.out.println(addresAbsolute);
                byte[] byteImagen;
                byteImagen = imagen.getBytes();
                Path allAddress = Paths.get(addresAbsolute + "//" + nombreImag);
                Files.write(allAddress, byteImagen);
            }

            Clothes c = new Clothes(name, price, description, type_animal, size, color, availability);
            svClothes.save(c);

        return result;
    }

}
