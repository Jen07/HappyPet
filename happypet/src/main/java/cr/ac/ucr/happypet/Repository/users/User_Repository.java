package cr.ac.ucr.happypet.Repository.users;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import cr.ac.ucr.happypet.Model.users.User;

public interface User_Repository extends JpaRepositoryImplementation<User, Integer> {

    @Query(value = "SELECT id FROM tb_user u WHERE u.id= :id and u.password=:password", nativeQuery = true)
    String checkUser(String id, String password);

    List<User> findByNameContaining(String filter);

}
