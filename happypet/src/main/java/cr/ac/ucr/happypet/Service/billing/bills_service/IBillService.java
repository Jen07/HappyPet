package cr.ac.ucr.happypet.Service.billing.bills_service;

import java.util.List;

import cr.ac.ucr.happypet.Model.billing.Bill;

public interface IBillService {
    Bill findById(int id);

    Bill save(Bill bill);

    void unArchieveBills(int owner);

    List<Bill> getUnArchievedBills(int owner);

    int getCountArchievedBills(int owner);

    void archieveBill(int id);

    List<Bill> findAll();

    void delete(int id);
}
