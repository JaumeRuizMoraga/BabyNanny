package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.User;

import java.util.Optional;

/**
 * Repository interface for managing User entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for User documents.
 * Includes custom query methods to find users by name, email, or a combination of name and password.
 */
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Finds a user by both username and password.
     *
     * @param name     the username
     * @param password the user's password
     * @return an Optional containing the User if found, or empty if not found
     */
    Optional<User> findByNameAndPassword(String name, String password);

    /**
     * Finds a user by username.
     *
     * @param name the username
     * @return an Optional containing the User if found, or empty if not found
     */

    Optional<User> findByName(String name);


    /**
     * Finds a user by email address.
     *
     * @param email the user's email
     * @return an Optional containing the User if found, or empty if not found
     */
    @Query(value = "{ 'email': ?0 }")
    Optional<User> findByEmail(String email);
}