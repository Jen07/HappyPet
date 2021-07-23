package cr.ac.ucr.happypet.Bussines;

import java.util.LinkedList;

import java.util.List;
import cr.ac.ucr.happypet.Model.users.User;

public class Logic {

  public List<User> listarCliente(List<User> lista){
    List<User> clients = new LinkedList<>();

    for (User user : lista) {  
      if(user.getType().equals("Cliente")){
        System.out.println(user.toString());
        clients.add(user);
      }
    }
    return clients;
  }

  public List<User> listarEmployee(List<User> lista){
    List<User> employess = new LinkedList<>();

    for (User user : lista) {  
      if(!user.getType().equals("Cliente")){
        employess.add(user);
      }
    }
    return employess;
  }

  public List<User> search(List<User> employees, String text, String filtro) {
    List<User> list = new LinkedList<>();
    text=text.toLowerCase();

    for (User e : employees) {
      if (filtro.equals("id")) { // id
        if(String.valueOf(e.getId()).toLowerCase().equals(text)){
          list.add(e);
        }
        
      } else if (filtro.equals("name")) { // name
        if(String.valueOf(e.getName()).toLowerCase().equals(text)){
          list.add(e);
        }
      } else if (filtro.equals("lastName")) { // lastName
        if(String.valueOf(e.getLastName()).toLowerCase().equals(text)){
          list.add(e);
        }
      } else { // tipo
        System.out.println("------------------"+text);
        if(String.valueOf(e.getType()).toLowerCase().equals(text)){
          list.add(e);
        }
      }
    }
    return list;
  }

  public List<User> searchClient(List<User> user, String text, String filtro) {
    List<User> list = new LinkedList<>();
    text=text.toLowerCase();

    for (User c : user) {
      if (filtro.equals("id")) { // id
        if(String.valueOf(c.getId()).toLowerCase().equals(text)){
          list.add(c);
        }
      } else if (filtro.equals("name")) { // name
        if(String.valueOf(c.getName()).toLowerCase().equals(text)){
          list.add(c);
        }
      } else{ // lastName
        if(String.valueOf(c.getLastName()).toLowerCase().equals(text)){
          list.add(c);
        }
      }
    }
    return list;
  }


  public boolean validateId(List<User> lista,int id) {
    boolean validate=true;

    for (User u : lista) {
      if(u.getId()==id){
        System.out.println(u.getId()+" ------/////// "+id);
        validate=false;
        break;
      }
    }
    return validate;
  }
}


