package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Token;

import java.util.Optional;

/**
 * Repository interface for managing Token entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for Token documents.
 * Includes custom query methods to search tokens by token string or by associated username.
 */
public interface TokenRepository extends MongoRepository<Token, String> {

    /**
     * Finds a token document by its token string.
     *
     * @param token the token string to search for
     * @return an Optional containing the Token if found, or empty if not found
     */
	@Query(value = "{ 'token': ?0}")
    Optional<Token> searchToken(String token);


    /**
     * Finds a token document by the username of the associated user.
     *
     * @param user the username to search for
     * @return an Optional containing the Token if found, or empty if not found
     */
    @Query(value = "{ 'user': ?0}")
    Optional<Token> searchUserToken(String user);
}
