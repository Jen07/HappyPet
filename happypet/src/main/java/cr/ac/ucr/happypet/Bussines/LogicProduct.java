package cr.ac.ucr.happypet.Bussines;

import java.util.LinkedList;
import java.util.List;

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
}

