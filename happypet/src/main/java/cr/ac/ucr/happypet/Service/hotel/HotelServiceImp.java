package  cr.ac.ucr.happypet.Service.hotel;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import cr.ac.ucr.happypet.Model.hotel.Hotel;
import cr.ac.ucr.happypet.Repository.hotel.HotelRepositorio;


@Service
public class HotelServiceImp implements IHotel {
	
	@Autowired
	HotelRepositorio repo;

	@Override
	public List<Hotel> buscarTodas() {
		 List<Hotel> hoteles= repo.findAll();
		return hoteles;
	}

	@Override
	public void guardar(Hotel hotel) {
		repo.save(hotel);

	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);

	}

	@Override
	public void modificar(Hotel hotel, int id) {
       Optional<Hotel> optional= repo.findById(id);
		
		if(optional.isPresent()) {
			
			Hotel hotelChange= optional.get();
			hotelChange.setDescription(hotel.getDescription());
			hotelChange.setAddress(hotel.getAddress());
			hotelChange.setNumberOfRooms(hotel.getNumberOfRooms());
			hotelChange.setPhone(hotel.getPhone());
			hotelChange.setPrice(hotel.getPrice());
			hotelChange.setSucursal(hotel.getSucursal());
			repo.save(hotelChange);
			
		}
	}

	@Override
	public Hotel buscarPorId(Integer id) {
		return repo.findById(id).get();
	}

	@Override
	public List<Hotel> buscar(String texto, String filtro){
		List<Hotel> hoteles= repo.findAll();
		List<Hotel> lista= new LinkedList<>() ;
		texto.toLowerCase();

		if(filtro.equals("code")){
			lista.add(repo.getById(Integer.parseInt(texto)));
		}

		for (Hotel hotel : hoteles) {
		     if(filtro.equals("ciudad")){
                 if(hotel.getSucursal().getCiudad().toLowerCase().equals(texto)){
                   lista.add(hotel);
				 }
			 }
		}

		return lista;
	}



}
