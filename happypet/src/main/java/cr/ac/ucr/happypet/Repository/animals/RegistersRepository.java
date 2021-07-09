package cr.ac.ucr.happypet.Repository.animals;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.animals.Register;


@Repository
public interface RegistersRepository extends JpaRepository<Register, Integer>{
    List<Register> findByOwner(int id);
}
