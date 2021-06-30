package cr.ac.ucr.happypet.Service.branchOffice;

import java.util.List;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;



public interface iSucursalService {
	
	public List<Sucursal>listar();
	public 	Sucursal searchById(String id);
	public int save(Sucursal s);
	public void delete(String id);
	public boolean update(Sucursal s);
	
	
}
