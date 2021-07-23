package cr.ac.ucr.happypet.Service.billing.bills_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.billing.Bill;
import cr.ac.ucr.happypet.Repository.billing.BillsRepository;

@Service
public class BillServiceImp implements IBillService {

    @Autowired
    BillsRepository repo;

    @Override
    public Bill findById(int id) {
        return repo.findById(id);
    }

    @Override
    public Bill save(Bill bill) {

        return repo.save(bill);
    }

    @Override
    public void unArchieveBills(int owner) {
        repo.unArchieveBills(owner);
    }

    @Override
    public List<Bill> getUnArchievedBills(int owner) {
        return repo.getUnArchievedBills(owner);
    }

    @Override
    public int getCountArchievedBills(int owner) {
        return repo.getCountArchievedBills(owner);
    }

    @Override
    public void archieveBill(int id) {
        repo.archieveBill(id);
    }

    @Override
    public List<Bill> findAll() {

        return repo.findAll();
    }

    @Override
    public void delete(int id) {
        repo.deleteById(id);
    }
}