package cr.ac.ucr.happypet.Repository.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.billing.Line;

@Repository
public interface LinesRepository extends JpaRepository<Line, Integer>{
    
}
