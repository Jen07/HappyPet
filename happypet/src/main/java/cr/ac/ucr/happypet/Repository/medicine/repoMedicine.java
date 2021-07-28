package cr.ac.ucr.happypet.Repository.medicine;

import org.springframework.data.jpa.repository.JpaRepository;

import cr.ac.ucr.happypet.Model.medicine.Medicina;

public interface repoMedicine extends JpaRepository<Medicina,Integer> {
    
        
}
