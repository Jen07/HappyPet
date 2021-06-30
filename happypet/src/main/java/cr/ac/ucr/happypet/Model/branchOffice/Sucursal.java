package cr.ac.ucr.happypet.Model.branchOffice;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sucursal")
public class Sucursal {

	@Id
	private String cedulaJuridica;
	private int provincia;
	private String ciudad;
	private String correo;
	private String telefono;
	private String horaInicio;
	private String horaFinal;
	
	public Sucursal(String cedulaJuridica, int provincia, String ciudad, String correo, String telefono,
			String horaInicio, String horaFinal) {
		
		this.cedulaJuridica = cedulaJuridica;
		this.provincia = provincia;
		this.ciudad = ciudad;
		this.correo = correo;
		this.telefono = telefono;
		this.horaInicio = horaInicio;
		this.horaFinal = horaFinal;
	}

	public Sucursal() {
		
	}

	public String getCedulaJuridica() {
		return cedulaJuridica;
	}

	public void setCedulaJuridica(String cedulaJuridica) {
		this.cedulaJuridica = cedulaJuridica;
	}

	public int getProvincia() {
		return provincia;
	}

	public void setProvincia(int provincia) {
		this.provincia = provincia;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getHoraInicio() {
		return horaInicio;
	}

	public void setHoraInicio(String horaInicio) {
		this.horaInicio = horaInicio;
	}

	public String getHoraFinal() {
		return horaFinal;
	}

	public void setHoraFinal(String horaFinal) {
		this.horaFinal = horaFinal;
	}
	
	
	

	
}
