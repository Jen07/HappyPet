package cr.ac.ucr.happypet.Service.users;

import java.util.List;

import cr.ac.ucr.happypet.Model.users.User;

public interface IUserService {

    void add(User u);

    void edit(int id, User u);

    void delete(int id);

    String checkUser(String id, String password);

    List<User> findByName(String filter);

    User findById(int id);

    List<User> getAll();

    List<User> getClients();

}
