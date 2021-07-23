package cr.ac.ucr.happypet.Bussines;

import java.util.LinkedList;
import java.util.List;

import cr.ac.ucr.happypet.Model.products.Aliment;
import cr.ac.ucr.happypet.Model.products.Clothes;

public class LogicProduct {

    public List<Clothes> search(List<Clothes> clothes, String text, String filtro) {
        List<Clothes> list = new LinkedList<>();
        text=text.toLowerCase();
    
        for (Clothes c : clothes) {
          if (filtro.equals("color")) { // color
            if(String.valueOf(c.getColor()).toLowerCase().equals(text)){
              list.add(c);
            }
            
          } else if (filtro.equals("name")) { // name
            if(String.valueOf(c.getName()).toLowerCase().equals(text)){
              list.add(c);
            }
          } else if (filtro.equals("talla")) { // lastName
            if(String.valueOf(c.getSize()).toLowerCase().equals(text)){
              list.add(c);
            }
          } else { // tipo
            if(String.valueOf(c.getType_animal()).toLowerCase().equals(text)){
              list.add(c);
            }
          }
        }
        return list;
      }


      public List<Aliment> searchA(List<Aliment> aliment, String text, String filtro) {
        List<Aliment> list = new LinkedList<>();
        text=text.toLowerCase();
    
        for (Aliment product : aliment) {
          if (filtro.equals("size")) { // tamaño
            if(String.valueOf(product.getSize()).toLowerCase().equals(text)){
              list.add(product);
            }
            
          } else if (filtro.equals("name")) { // name
            if(String.valueOf(product.getName()).toLowerCase().equals(text)){
              list.add(product);
            }
          
          } else { // tipo
            if(String.valueOf(product.getType_animal()).toLowerCase().equals(text)){
              list.add(product);
            }
          }
        }
        return list;
      }
}

