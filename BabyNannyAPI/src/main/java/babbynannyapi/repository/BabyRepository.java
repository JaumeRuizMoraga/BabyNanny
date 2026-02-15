package babbynannyapi.repository;

import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Baby;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends MongoRepository<Baby, String> {

    @Query(value = "{ 'tutors': ?0}")
    List<Baby> searchBabies(String tutors);
}
