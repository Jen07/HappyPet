package cr.ac.ucr.happypet.Model.users;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;


@Entity
@Table(name="tb_employee")
@PrimaryKeyJoinColumn(referencedColumnName ="id")
public class Employee extends User{
	
    private String type;
    private int salary;
    
    public Employee() {}
	
    
    public Employee(int id, String name, String lastName, String password, String mail, String phone,
			String address, String imagen, String type, int salary) {
		super(id, name, lastName, password, mail, phone, address, imagen);
		this.type = type;
		this.salary = salary;
	}

	public Employee(int id, String name, String lastName, String password, String mail, String phone,
			String address, String type, int salary) {
		super(id, name, lastName,password, mail, phone, address);
		this.type = type;
		this.salary = salary;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "Employee [type=" + type + ", salary=" + salary + "]";
	}   
    
}
