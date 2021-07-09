package cr.ac.ucr.happypet.Service.branchOffice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.branchOffice.Canton;
import cr.ac.ucr.happypet.Repository.branchOffice.iCanton;



@Service
public class cantonService implements iCantonService{

		@Autowired
		private iCanton data;
	
	@Override
	public List<Canton> getCantones(int codigoProvincia) {
			
			List<Canton> cantones=data.idProvincia(codigoProvincia);
			
			
		return cantones;
	}

	@Override
	public void updateCanton(Canton canton) {
		data.save(canton);
	}

	@Override
	public Canton getCanton(int idCanton) {
		
		return data.getById(idCanton);
	}

	@Override
	public Canton getCantonByNameAndProvincia(int idProvincia, String nameCanton) {
		
		return data.findByCodigoProvinciaAndNombreCanton(idProvincia, nameCanton);
	}

	
}
