package babbynannyapi.repository;
import babbynannyapi.model.Emails;
import babbynannyapi.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Repository interface for managing Emails entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for Emails documents.
 * Used for email verification purposes during user registration or authentication.
 */
public interface EmailRepository extends MongoRepository<Emails, String> {

	/**
	 * Finds an Emails document by its verification code and associated email address.
	 *
	 * @param code  the verification code
	 * @param email the email address associated with the code
	 * @return an Optional containing the Emails document if found, or empty if not found
	 */
	Optional<Emails> findByCodeAndEmail(String code,String email);

}
