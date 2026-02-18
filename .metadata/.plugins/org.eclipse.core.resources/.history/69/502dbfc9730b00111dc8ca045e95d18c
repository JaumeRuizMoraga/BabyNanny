package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByNameAndPassword(String name, String password);

    @Query(value = "{ 'name': ?0, 'password': ?1, 'email': ?2 }")
    Optional<User> searchUserPassEmail(String name, String password, String email);
}