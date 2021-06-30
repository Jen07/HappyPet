package cr.ac.ucr.happypet.Service.users;

import cr.ac.ucr.happypet.Model.users.User;

public interface IUserService {
	
    void edit(int id,User u);

    String checkUser(String id,String password);

}
