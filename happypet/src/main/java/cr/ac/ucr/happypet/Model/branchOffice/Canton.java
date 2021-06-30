package cr.ac.ucr.happypet.Model.branchOffice;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="canton_cr")
public class Canton {
	
	
	@Id
	private int codigo_canton;
	private int codigoProvincia;
	private String nombre_canton;
	
	
	
	public int getCodigo_canton() {
		return codigo_canton;
	}
	public void setCodigo_canton(int codigo_canton) {
		this.codigo_canton = codigo_canton;
	}
	public int getCodigoProvincia() {
		return codigoProvincia;
	}
	public void setCodigoProvincia(int codigoProvincia) {
		this.codigoProvincia = codigoProvincia;
	}
	public String getNombre_canton() {
		return nombre_canton;
	}
	public void setNombre_canton(String nombre_canton) {
		this.nombre_canton = nombre_canton;
	}
	
	

}
