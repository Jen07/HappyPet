package cr.ac.ucr.happypet.Service.users;

import java.util.List;

import cr.ac.ucr.happypet.Model.users.Employee;


public interface IEmployeeService {

	List<Employee> listaTodo();

	void save(Employee emp);

	Employee findByid(int id);

	void delete(int id);

	void edit(int id,Employee e);

}
