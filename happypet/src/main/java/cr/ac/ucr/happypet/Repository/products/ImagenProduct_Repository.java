package cr.ac.ucr.happypet.Repository.products;

import org.springframework.data.jpa.repository.JpaRepository;

import cr.ac.ucr.happypet.Model.products.ProductImage;

public interface ImagenProduct_Repository extends JpaRepository<ProductImage,Integer> {
   

     // @Query(value="Delete from tb_product_images where pixel = :pixel ;",nativeQuery = true)	
	//  void deleteI(byte[] pixel);
     
}
