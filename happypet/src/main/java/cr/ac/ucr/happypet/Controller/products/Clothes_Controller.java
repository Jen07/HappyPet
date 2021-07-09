package cr.ac.ucr.happypet.Controller.products;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.GregorianCalendar;
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
import org.springframework.web.multipart.MultipartFile;
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
    Calendar calendario = new GregorianCalendar();

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
        return svClothes.findById(codigo);
    }

    // search

    @PostMapping("/search")
    public List<Clothes> search(@RequestParam String text, @RequestParam String filtro) {
        return log.search(svClothes.listarTodo(), text, filtro);
    }

    @PostMapping("/add")
    public String saveClothes(@RequestParam String name, @RequestParam int price,
     @RequestParam String description,@RequestParam("type") String type_animal,
    @RequestParam String color, @RequestParam String size,@RequestParam boolean availability) {

        Clothes c = new Clothes(name, price, description, type_animal, size, color, availability);
        svClothes.save(c);

        return "Agregado";
    }

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
