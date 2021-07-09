package cr.ac.ucr.happypet.Service.animals.registers_service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Register;
import cr.ac.ucr.happypet.Repository.animals.RegistersRepository;

@Service
public class RegistersServiceImp implements IRegistersService {

    @Autowired
    RegistersRepository repo;

    @Override
    public List<Register> findAll() {
        return repo.findAll();
    }

    @Override
    public void insert(Register register) {
        repo.save(register);
    }

    @Override
    public void delete(Register register) {
        repo.delete(register);
    }

    @Override
    public void update(Register register) {

        Optional<Register> optional = repo.findById(register.getId());

        if (optional.isPresent()) {
            Register temp = optional.get();
            temp.setOwner(register.getOwner());
            repo.save(temp);
        }
    }

    @Override
    public Register findById(int id) {

        Optional<Register> optional = repo.findById(id);

        if (optional.isPresent()) {
            return optional.get();

        }

        return null;
    }

    @Override
    public List<Register> findByOwner(int id) {
        return repo.findByOwner(id);
    }

    @Override
    public void save(Register register) {
        repo.save(register);
    }

}
