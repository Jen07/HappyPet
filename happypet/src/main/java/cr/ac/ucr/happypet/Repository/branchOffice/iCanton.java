package cr.ac.ucr.happypet.Repository.branchOffice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cr.ac.ucr.happypet.Model.branchOffice.Canton;


public interface iCanton extends JpaRepository<Canton, Integer>{

	
	@Query(value="{call id_provincia(:idIn)}",nativeQuery = true)
	List<Canton> idProvincia(@Param("idIn") int idInt);
	
	Canton findByCodigoProvinciaAndNombreCanton(int idProvincia,String nameCanton);
}
