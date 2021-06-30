package cr.ac.ucr.happypet.Repository.billing;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.billing.Bill;

@Repository
public interface BillsRepository extends JpaRepository<Bill, Integer> {
    Bill findById(int id);

    // Desarchiva las facturas de un usuario
    @Query(value = "{call pr_unarchive_bills(:id_owner)}", nativeQuery = true)
    void unArchieveBills(@Param("id_owner") int owner);

    // Obtiene solo facturas no archivadas
    @Query(value = "{call pr_get_unarchived_bills(:id_owner)}", nativeQuery = true)
    List<Bill> getUnArchievedBills(@Param("id_owner") int owner);

    // Obtiene conteo de facturas archivadas
    @Query(value = "{call pr_get_count_archived_bills(:id_owner)}", nativeQuery = true)
    int getCountArchievedBills(@Param("id_owner") int owner);

    // Desarchiva las facturas de un usuario
    @Query(value = "{call pr_archive_bill(:id)}", nativeQuery = true)
    void archieveBill(@Param("id") int id);

}
