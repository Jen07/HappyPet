package cr.ac.ucr.happypet.Service.branchOffice;

import java.util.LinkedList;
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
	public List<String> getCantones(int codigoProvincia) {
			List<String> cantones= new LinkedList<String>();
			List<Canton> temp=data.idProvincia(codigoProvincia);
			for (Canton canton : temp) {
				cantones.add(canton.getNombre_canton());
			}
			
		return cantones;
	}

	
}
