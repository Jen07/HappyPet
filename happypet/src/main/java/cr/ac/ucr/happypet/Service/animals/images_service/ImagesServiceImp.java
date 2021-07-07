package cr.ac.ucr.happypet.Service.animals.images_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Image;
import cr.ac.ucr.happypet.Repository.animals.ImageRepository;

@Service
public class ImagesServiceImp implements IImagesService {

    @Autowired
    ImageRepository repo;

    @Override
    public List<Image> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Image> findByAnimalId(int id) {
        return repo.findByAnimalId(id);
    }

    @Override
    public Image findById(int id) {
        return repo.findById(id);
    }

    @Override
    public void delete(Image img) {
        repo.delete(img);
    }

    @Override
    public void save(Image img) {
        repo.save(img);
    }

    @Override
    public void deleteAll(List<Image> img) {
        repo.deleteAll(img);

    }

}
