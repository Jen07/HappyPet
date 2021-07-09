package cr.ac.ucr.happypet.Service.animals.services_service;

import java.util.List;

import cr.ac.ucr.happypet.Model.animals.Service;

public interface IServicesService{
    List<Service> findByRegisterId(int id);
}
