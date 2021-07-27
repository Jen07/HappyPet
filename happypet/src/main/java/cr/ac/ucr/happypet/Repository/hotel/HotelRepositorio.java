
package  cr.ac.ucr.happypet.Repository.hotel;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import cr.ac.ucr.happypet.Model.hotel.Hotel;


@Repository
public interface HotelRepositorio extends JpaRepository<Hotel, Integer> {

}

