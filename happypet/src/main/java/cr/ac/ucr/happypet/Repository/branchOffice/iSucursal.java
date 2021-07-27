package cr.ac.ucr.happypet.Repository.branchOffice;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;


public interface iSucursal extends JpaRepository<Sucursal, String> {

    List<Sucursal> findByCedulaJuridica(String id);
    List<Sucursal> findByProvincia(int id);
    List<Sucursal> findByCiudad(String id);
    @Query(value="select *from sucursal s inner join tb_hotel h WHERE s.CedulaJuridica != h.cedulaJuridica;"
    ,nativeQuery = true)
    List<Sucursal> getNoSucursal();
	
}
