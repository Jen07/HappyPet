package cr.ac.ucr.happypet.Repository.branchOffice;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;


public interface iSucursal extends JpaRepository<Sucursal, String> {

    List<Sucursal> findByCedulaJuridica(String id);
    List<Sucursal> findByProvincia(int id);
    List<Sucursal> findByCiudad(String id);
   
	
}
