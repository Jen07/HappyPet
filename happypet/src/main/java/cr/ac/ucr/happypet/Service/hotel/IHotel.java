
package  cr.ac.ucr.happypet.Service.hotel;
import java.util.List;

import cr.ac.ucr.happypet.Model.hotel.Hotel;


public interface IHotel {
	
	List<Hotel> buscarTodas ();
	
	void guardar (Hotel hotel);
	
	void eliminar(Integer id);
	
	void modificar(Hotel hotel, int id);
	
	Hotel buscarPorId(Integer id);
}
