package cr.ac.ucr.happypet.Model.animals;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author Luis Leiton Clase de expediente, contiene el animal y los servicios
 *         que este ha recibido
 */

@Entity
@Table(name = "tb_registers")
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public int owner;

    @OneToOne(mappedBy = "registerId")
    private Animal animal;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOwner() {
        return owner;
    }

    public void setOwner(int owner) {
        this.owner = owner;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

}
