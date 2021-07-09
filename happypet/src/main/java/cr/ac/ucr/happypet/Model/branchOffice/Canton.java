package cr.ac.ucr.happypet.Model.branchOffice;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="canton_cr")
public class Canton {
	
	
	@Id
	private int codigoCanton;
	private int codigoProvincia;
	private String nombreCanton;
	private boolean estado;

	
	public int getCodigoCanton() {
		return codigoCanton;
	}
	public void setCodigoCanton(int codigoCanton) {
		this.codigoCanton = codigoCanton;
	}
	public int getCodigoProvincia() {
		return codigoProvincia;
	}
	public void setCodigoProvincia(int codigoProvincia) {
		this.codigoProvincia = codigoProvincia;
	}
	public String getNombreCanton() {
		return nombreCanton;
	}
	public void setNombreCanton(String nombreCanton) {
		this.nombreCanton = nombreCanton;
	}
	public boolean isEstado() {
		return estado;
	}
	public void setEstado(boolean estado) {
		this.estado = estado;
	}
	
	
	
	
	

	
	
	

}
