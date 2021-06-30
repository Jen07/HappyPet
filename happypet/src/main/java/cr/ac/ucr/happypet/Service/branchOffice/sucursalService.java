package cr.ac.ucr.happypet.Service.branchOffice;


import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.branchOffice.Sucursal;
import cr.ac.ucr.happypet.Repository.branchOffice.iSucursal;



@Service
public class sucursalService implements iSucursalService{

	
	@Autowired
	private iSucursal data;
	
	@Override
	public List<Sucursal> listar() {
	
		return (List<Sucursal>)data.findAll();
	
	}


	@Override
	public int save(Sucursal s) {
		data.save(s);
		return 0;
	}

	@Override
	public void delete(String cedula) {
		data.deleteById(cedula);
		
	}

	@Override
	public boolean update(Sucursal s) {
		data.save(s);
		return true;
	}


	@Override
	public Sucursal searchById(String id) {
		Optional<Sucursal> sucursal= data.findById(id);		
		return sucursal.get();
	}


	


	

}
