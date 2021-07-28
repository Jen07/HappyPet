package cr.ac.ucr.happypet.Service.medicine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.medicine.Medicina;
import cr.ac.ucr.happypet.Repository.medicine.repoMedicine;

@Service
public class MedicineService implements iMedicine {

    @Autowired 
    private repoMedicine data;

    @Override
    public Medicina save(Medicina medicina) {
       
        return data.save(medicina);
    }
    
}
