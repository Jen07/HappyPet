package cr.ac.ucr.happypet.Service.users;

import java.util.List;

import cr.ac.ucr.happypet.Model.users.User;

public interface IUserService {
	
    void edit(int id,User u);

    String checkUser(String id,String password);

    List<User> findByName(String filter);
    User findById(int id);
    List<User> getAll();

}
