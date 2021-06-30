package cr.ac.ucr.happypet.Service.users;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.users.Employee;
import cr.ac.ucr.happypet.Repository.users.Employee_Repository;


@Service
public class EmployeeServiceImp implements IEmployeeService {
	
	
	@Autowired
	private Employee_Repository repo;
	
	//LISTAR
	@Override
	public List<Employee> listaTodo(){
		return repo.findAll();
	}
	
	//GUARDAR
	@Override
	public void save (Employee emp) {
	   repo.save(emp);
	}
	
	//BUSCAR
	@Override
	public Employee findByid(int id){
		Employee e=repo.findById(id).get();
		return e;
	}

	//ELIMINAR
	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}
	
	//EDITAR
	@Override
	public void edit(int id,Employee e) {
         Optional<Employee> opcional = repo.findById(id);
		  if (opcional.isPresent()) {
		       repo.save(e); 
		  }
	}

}
