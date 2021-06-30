package cr.ac.ucr.happypet.Service.animals.images_service;

import java.util.List;

import cr.ac.ucr.happypet.Model.animals.Image;

public interface IImagesService {
    List<Image> findAll();
    List<Image> findByAnimalId(int id);

    Image findById(int id);
    
    void delete (Image img);
    void save (Image img);
}
