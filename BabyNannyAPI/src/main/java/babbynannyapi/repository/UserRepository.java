package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByNameAndPassword(String name, String password);
    Optional<User> findByName(String name);  
    @Query(value = "{ 'email': ?0 }")
    Optional<User> findByEmail(String email);
}