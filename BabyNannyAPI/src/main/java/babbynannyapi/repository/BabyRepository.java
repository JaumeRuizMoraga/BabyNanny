package babbynannyapi.repository;

import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Baby;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Baby entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for Baby documents.
 * Includes a custom query method to find all babies associated with a specific tutor.
 */

public interface BabyRepository extends MongoRepository<Baby, String> {

    /**
     * Finds all babies that have the specified tutor in their tutors list.
     *
     * @param tutors the tutor's username or identifier
     * @return a list of Baby objects associated with the tutor
     */
    @Query(value = "{ 'tutors': ?0}")
    List<Baby> searchBabies(String tutors);
}
