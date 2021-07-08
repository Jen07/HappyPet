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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import cr.ac.ucr.happypet.Bussines.Logic;
import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Service.users.IUserService;

@RestController
@RequestMapping("/client")
public class Client_Controller extends MainController {

    @Autowired
    private IUserService svClient;
    private Logic log = new Logic();

    // Muestra el inicio
    @RequestMapping("/inicio")
    public ModelAndView checkLogin() {
        ModelAndView view = new ModelAndView();
        view.setViewName("/users/client/list");
        return view;
    }

    // Dirige al form de agregar
    @GetMapping("/addClient")
    public ModelAndView name() {
        ModelAndView view = new ModelAndView();
        view.setViewName("users/client/addClient");
        return view;
    }

    // Manda la lista para js
    @RequestMapping("/listar")
    public ResponseEntity<List<User>> listar() {
        List<User> lista = log.listarCliente(svClient.getAll());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    // Obtiene la información del cliente a mostrar en detalles
    @GetMapping("/detail/{id}")
    public User getDetailClient(@PathVariable int id) {
        System.out.println(id);
        return svClient.findById(id);
    }

    // Elimina al CLiente
    @PostMapping("/delete")
    public String delete(@RequestParam int id) {
        svClient.delete(id);
        return "Elimino";
    }

    @PostMapping("/search")
    public List<User> search(@RequestParam String text, @RequestParam String filtro, Model model) {
        return log.searchClient(log.listarCliente(svClient.getAll()), text, filtro);
    }

    // Direciona a paguina Editar
    @GetMapping("/getEdit")
    public ModelAndView getEdit(@RequestParam("id") int id, Model model) {//
        model.addAttribute("c", svClient.findById(id));
        ModelAndView view = new ModelAndView();
        view.setViewName("/users/client/edit");
        return view;
    }

    // ---------------------------- Lo de las imagenes
    // Registro
    @PostMapping("/add")
    public String add(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("phone") String tel,
            @RequestParam("passw") String passw, @RequestParam("mail") String mail) {

        String result = "Agregado";
        if (log.validateId(svClient.getAll(), id)) {
            User client = new User(id, name, lastName, passw, mail, tel, "", "Cliente");
            svClient.add(client);
        } else {
            result = "falla";
        }
        return result;
    }

    // Con imagen
    @PostMapping("/addClient")
    public String add2(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("phone") String phone,
            @RequestParam("passw") String passw, @RequestParam("mail") String mail,
            @RequestParam("address") String address, @RequestParam("imagen") MultipartFile imagen) throws IOException {

        String result = "Agregado";
        if (log.validateId(svClient.getAll(), id)) {
            String nombreImag = id + ".jpg";
            if (!imagen.isEmpty()) {
                Path addressImagen = Paths.get("src//main//resources//static//users/imageEmployee");
                String addresAbsolute = addressImagen.toFile().getAbsolutePath();
                System.out.println(addresAbsolute);
                byte[] byteImagen;
                byteImagen = imagen.getBytes();
                System.out.println(imagen.getOriginalFilename() + "--------");
                Path allAddress = Paths.get(addresAbsolute + "//" + nombreImag);
                Files.write(allAddress, byteImagen);
            }

            User client = new User(id, name, lastName, passw, mail, phone, address, nombreImag, "Cliente");
            svClient.add(client);

        } else {
            result = "falla";
        }
        return result;
    }

    //Sin imagen 
    @PostMapping("/addClient2")
    public String add3(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("phone") String phone,
            @RequestParam("passw") String passw, @RequestParam("mail") String mail,
            @RequestParam("address") String address) {

        String result = "Agregado";
        if (log.validateId(svClient.getAll(), id)) {
            User client = new User(id, name, lastName, passw, mail, phone, address, "Cliente");
            svClient.add(client);
        } else {
            result = "falla";
        }

        return result;
    }

    // -----------+++++++++++++++++++++++------------------++++++++++++++++++++++
    @PostMapping("/edit2") // sin foto
    public String editSinImagen(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("tel") String phone,
            @RequestParam("passw") String passw, @RequestParam("address") String address,
            @RequestParam("mail") String mail, @RequestParam("oldImage") String imagen) {

        User client = new User();
        if (imagen.equals("")) {
            client = new User(id, name, lastName, passw, mail, phone, address, "Cliente");
        } else {
            client = new User(id, name, lastName, passw, mail, phone, address, imagen, "Cliente");
        }

        svClient.edit(id, client);

        return "Listo";
    }

    @PostMapping("/edit") // con foto
    public String edit(@RequestParam("id") int id, @RequestParam("name") String name,
            @RequestParam("lastName") String lastName, @RequestParam("tel") String phone,
            @RequestParam("passw") String passw, @RequestParam("address") String address,
            @RequestParam("mail") String mail, @RequestParam("imagen") MultipartFile imagen) throws IOException {

        String nombreImag = id + ".png";
        if (!imagen.isEmpty()) {
            Path addressImagen = Paths.get("src//main//resources//static//users/imageEmployee");
            String addresAbsolute = addressImagen.toFile().getAbsolutePath();
            byte[] byteImagen;
            byteImagen = imagen.getBytes();
            Path allAddress = Paths.get(addresAbsolute + "//" + nombreImag);
            Files.write(allAddress, byteImagen);
        }

        User client = new User(id, name, lastName, passw, mail, phone, address, nombreImag, "Cliente");
        svClient.edit(id, client);

        return "Listo";
    }

}
