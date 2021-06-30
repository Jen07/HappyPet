package cr.ac.ucr.happypet.Service.animals.services_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cr.ac.ucr.happypet.Model.animals.Service;
import cr.ac.ucr.happypet.Repository.animals.ServicesRepository;

@org.springframework.stereotype.Service
public class ServicesServiceImp implements IServicesService {
    @Autowired ServicesRepository repo;

    @Override
    public List<Service> findByRegisterId(int id) {
        return repo.findByRegisterId(id);
    }
}
