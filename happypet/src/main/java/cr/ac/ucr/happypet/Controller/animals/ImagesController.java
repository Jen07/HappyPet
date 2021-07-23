package cr.ac.ucr.happypet.Controller.animals;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.animals.Image;
import cr.ac.ucr.happypet.Service.animals.animals_service.IAnimalsService;
import cr.ac.ucr.happypet.Service.animals.images_service.IImagesService;

@Controller
@RequestMapping(value = "/animal")

public class ImagesController extends MainController {

    @Autowired
    IAnimalsService animalsRepo;

    @Autowired
    IImagesService imagesRepo;

    @GetMapping(value = "/images/{id}")
    public String imagesFormulary(@PathVariable int id, Model mod) {
        mod.addAttribute("animal", animalsRepo.findById(id));
        mod.addAttribute("images", imagesRepo.findByAnimalId(id));
        return "animals/gestion_images";
    }

    @PostMapping(path = "/save_image2")
    public String saveImage2(@RequestParam("file") MultipartFile file, @RequestParam final int id) throws IOException {

        if (!file.isEmpty()) {

            Image img = new Image();

            img.setAnimal(animalsRepo.findById(id));
            img.setName(file.getOriginalFilename());
            img.setType(file.getContentType());
            img.setSize(file.getSize());
            img.setPixel(file.getBytes());
            imagesRepo.save(img);
        }

        return String.format("redirect:/animal/images/%s", id);
    }

    @PostMapping(path = "/save_image")
    public String saveImage(@RequestParam("file") MultipartFile file, @RequestParam final int id) throws IOException {

        if (!file.isEmpty()) {

            Image img = new Image();

            img.setAnimal(animalsRepo.findById(id));
            img.setName(file.getOriginalFilename());
            img.setType(file.getContentType());
            img.setSize(file.getSize());
            img.setPixel(file.getBytes());

            imagesRepo.save(img);

            Image savedImage = imagesRepo.findByAnimalId(id).get(imagesRepo.findByAnimalId(id).size() - 1);

            Path addressImagen = Paths.get("src//main//resources//static//animals//assets/pictures");
            String addresAbsolute = addressImagen.toFile().getAbsolutePath();

            byte[] byteImagen;
            byteImagen = file.getBytes();

            Path allAddress = Paths.get(addresAbsolute + "//" + savedImage.getId() + ".jpg");
            Files.write(allAddress, byteImagen);
        }

        return String.format("redirect:/animal/images/%s", id);
    }

    @GetMapping(path = "/delete_image")
    public String deleteImage(@RequestParam final int id) {

        imagesRepo.delete(imagesRepo.findById(id));
        return "redirect:/test_image";
    }

    @GetMapping("/build_image/{id}")
    public void buildImage(@PathVariable int id, HttpServletResponse response) throws IOException {
        // Tipo de objeto.
        response.setContentType("image/jpeg");
        // Obtencion de la imagen.
        Image img = imagesRepo.findById(id);
        // Conversion del array de bytes.
        InputStream is = new ByteArrayInputStream(img.getPixel());
        // Asignacion de imagen a la respuesta.
        IOUtils.copy(is, response.getOutputStream());
    }

}