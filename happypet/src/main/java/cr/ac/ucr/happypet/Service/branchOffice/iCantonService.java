package cr.ac.ucr.happypet.Service.branchOffice;

import java.util.List;

import cr.ac.ucr.happypet.Model.branchOffice.Canton;

public interface iCantonService {
	
	Canton getCanton(int idCanton);
	Canton getCantonByNameAndProvincia(int idProvincia,String nameCanton);
	List<Canton> getCantones(int codigoProvincia);
	void updateCanton(Canton canton);
}
