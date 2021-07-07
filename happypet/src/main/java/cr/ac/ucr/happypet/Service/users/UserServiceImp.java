package cr.ac.ucr.happypet.Service.users;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.users.User;
import cr.ac.ucr.happypet.Repository.users.User_Repository;

@Service
public class UserServiceImp implements IUserService {

	@Autowired
	private User_Repository repo;

	@Override
	public void add(User u) {
		repo.save(u);
	}

	@Override
	public void edit(int id, User u) {
		Optional<User> opcional = repo.findById(id);
		if (opcional.isPresent()) {
			repo.save(u);
		}
	}

	@Override
	public String checkUser(String id, String password) {
		return repo.checkUser(id, password) ;
	}

	@Override
	public List<User> findByName(String filter) {
		return repo.findByNameContaining(filter);
	}

	@Override
	public List<User> getAll() {
		return repo.findAll();
	}

	@Override
	public User findById(int id) {
		return repo.findById(id).get();
	}

}