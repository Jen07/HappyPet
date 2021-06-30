package cr.ac.ucr.happypet.Repository.animals;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.animals.Service;

@Repository
public interface ServicesRepository extends JpaRepository<Service, Integer>{
    List<Service> findByRegisterId(int id);
}
