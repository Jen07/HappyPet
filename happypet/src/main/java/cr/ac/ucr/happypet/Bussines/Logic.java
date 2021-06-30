package cr.ac.ucr.happypet.Bussines;

import java.util.LinkedList;

import java.util.List;

import cr.ac.ucr.happypet.Model.users.Employee;

public class Logic {

  //Sin funcionalidad 
  public List<Employee> search(List<Employee> employees, String text) {
    List<Employee> list = new LinkedList<>();
    text.toLowerCase();

    for (Employee e : employees) {
      if (String.valueOf(e.getId()).toLowerCase().contains(text) || e.getName().toLowerCase().contains(text)
          || e.getLastName().toLowerCase().contains(text) || e.getType().toLowerCase().contains(text)) {
        list.add(e);
      }
    }

    return list;
  }

  public List<Employee> search(List<Employee> employees, String text, String filtro) {
    List<Employee> list = new LinkedList<>();
    text=text.toLowerCase();

    //System.out.println("LOGICAS TEXT :"+text);
    //System.out.println("LOGICAS Filtro :"+filtro);

    for (Employee e : employees) {
      if (filtro.equals("id")) { // id
        if(String.valueOf(e.getId()).toLowerCase().equals(text)){
          list.add(e);
        }
        break;
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

}
