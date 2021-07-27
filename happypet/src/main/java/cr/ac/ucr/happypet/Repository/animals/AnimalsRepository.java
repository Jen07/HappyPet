 package cr.ac.ucr.happypet.Repository.animals;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.animals.Animal;

@Repository
public interface AnimalsRepository extends JpaRepository<Animal, Integer> {

    List<Animal> findByType(char type);

    List<Animal> findByNameStartingWith(String name);

    List<Animal> findBySpecie(String name);

    List<Animal> findByBreed(String name);

    @Query(value = "CALL pr_get_register_by_owner(:id_owner);", nativeQuery = true)
    List<Animal> findByOwner(@Param("id_owner") int owner);

    List<Animal> findAllByOrderByIdDesc();
}