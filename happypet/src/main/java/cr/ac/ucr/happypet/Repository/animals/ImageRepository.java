package cr.ac.ucr.happypet.Repository.animals;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cr.ac.ucr.happypet.Model.animals.Image;

public interface ImageRepository extends JpaRepository<Image, Integer>{
    Image findById(int id);
    List<Image> findByAnimalId(int id);
}
