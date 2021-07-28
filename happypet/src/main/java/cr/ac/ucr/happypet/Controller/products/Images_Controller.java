package cr.ac.ucr.happypet.Controller.products;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cr.ac.ucr.happypet.Controller.MainController;
import cr.ac.ucr.happypet.Model.products.Clothes;
import cr.ac.ucr.happypet.Model.products.ProductImage;
import cr.ac.ucr.happypet.Service.products.IClothesService;
import cr.ac.ucr.happypet.Service.products.IImagenesServiceProduct;

@Controller
@RequestMapping("/imagenProducts")
public class Images_Controller extends MainController {

    @Autowired
    private IClothesService svClothes;

    @Autowired
    private IImagenesServiceProduct svImages;

    
	@GetMapping(value = "/generate")
    public String imagesFormulary(@RequestParam int id, Model model) {
        model.addAttribute("producto", svClothes.findById(id));
        model.addAttribute("images", svClothes.findById(id).getImages());
       return "/products/clothes/gestion_imagen";
    }

    @GetMapping(path = "/deleteI")
    @ResponseBody
    public String deleteImage(@RequestParam final int id) {
        svImages.delete(id);
        return "Eliminado";
    }

    @PostMapping("/saveI")
    @ResponseBody
    public String saveImage(@RequestParam("file") MultipartFile file, @RequestParam final int id) throws IOException {
        
        if (!file.isEmpty()) {

            System.out.println("entro");
            ProductImage img = new ProductImage();
            
            img.setProduct(svClothes.findById(id));
            img.setName(file.getOriginalFilename());
            img.setType(file.getContentType());
            img.setSize(file.getSize());
            img.setPixel(file.getBytes());
            svImages.save(img);
        }

        return "Agregado";
    }

    @GetMapping("/get_product_images")
    @ResponseBody
    public List<byte[]> pixeles(@RequestParam final Integer id) {
        Clothes clothes = svClothes.findById(id);
        List<byte[]> pixel = new LinkedList<>();

        for (ProductImage img : clothes.getImages()) {
            pixel.add(img.getPixel());
        }
        return pixel;
    }

    @GetMapping("/get_id")
    @ResponseBody
    public List<Integer> id(@RequestParam final Integer id) {
        Clothes clothes = svClothes.findById(id);
        List<Integer> idImages = new LinkedList<>();

        for (ProductImage img : clothes.getImages()) {
            idImages.add(img.getId());
        }
        return idImages;
    }

    
}
