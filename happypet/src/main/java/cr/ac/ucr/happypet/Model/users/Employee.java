package cr.ac.ucr.happypet.Model.users;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;


@Entity
@Table(name="tb_employee")
@PrimaryKeyJoinColumn(referencedColumnName ="id")
public class Employee extends User{
	
    private int salary;
    
    public Employee() {}
	
    
    public Employee(int id, String name, String lastName, String password, String mail, String phone,
			String address, String imagen, int salary,String type) {
		super(id, name, lastName, password, mail, phone, address, imagen,type);
		this.salary = salary;
	}

	public Employee(int id, String name, String lastName, String password, String mail, String phone,
			String address, int salary,String type) {
		super(id, name, lastName, password, mail, phone, address, type);
		this.salary = salary;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return super.toString()+" Employee salary=" + salary + "]";
	}   
    
}
