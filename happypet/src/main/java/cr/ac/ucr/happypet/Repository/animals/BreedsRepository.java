package cr.ac.ucr.happypet.Repository.animals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cr.ac.ucr.happypet.Model.animals.Breed;
import java.util.List;

@Repository
public interface BreedsRepository extends JpaRepository<Breed, String> {
    List<Breed> findBySpecie(String specie);
}