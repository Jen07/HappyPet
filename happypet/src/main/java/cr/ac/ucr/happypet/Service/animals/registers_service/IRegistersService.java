package cr.ac.ucr.happypet.Service.animals.registers_service;

import java.util.List;

import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.animals.Register;

@Service
public interface IRegistersService {
    List<Register> findAll();
    List<Register> findByOwner(int id);

    Register findById(int id);
    void insert(Register register);
    void delete(Register register);
    void update(Register register);
    void save(Register register);

}
