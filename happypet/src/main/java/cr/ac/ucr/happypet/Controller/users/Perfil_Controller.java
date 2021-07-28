package cr.ac.ucr.happypet.Controller.users;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.billing.ShoppingCart;
import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Service.users.IUserService;


@RestController
@RequestMapping("/perfil")
public class Perfil_Controller  extends MainController{

    @Autowired
    private IUserService svClient;

      @PostMapping("/edit2") // sin foto
      public String editSinImagen(@RequestParam("id") int id, @RequestParam("name") String name,
              @RequestParam("lastName") String lastName, @RequestParam("tel") String phone,
              @RequestParam("passw") String passw, @RequestParam("address") String address,
              @RequestParam("mail") String mail, @RequestParam("oldImage") String imagen
              , @ModelAttribute ShoppingCart session) {
  
          User client = new User();
          if (imagen.equals("")) {
              client = new User(id, name, lastName, passw, mail, phone, address, "Cliente");
          } else {
              client = new User(id, name, lastName, passw, mail, phone, address, imagen, "Cliente");
          }
  
          svClient.edit(id, client);
          System.out.println(svClient.findById(id));
          session.setUser(svClient.findById(id));
        
  
          return "Listo";
      }
  
      @PostMapping("/edit") // con foto
      public String edit(@RequestParam("id") int id, @RequestParam("name") String name,
              @RequestParam("lastName") String lastName, @RequestParam("tel") String phone,
              @RequestParam("passw") String passw, @RequestParam("address") String address,
              @RequestParam("mail") String mail, @RequestParam("ima") MultipartFile imagen
              ,@ModelAttribute ShoppingCart session) throws IOException {
  
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
          session.setUser( svClient.findById(id));
  
          return "Listo";
      }    
}
