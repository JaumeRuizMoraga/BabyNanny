package babbynannyapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import babbynannyapi.model.Bebe;

public interface BebeRepository extends MongoRepository<Bebe, String> {
	
	 @Query(value = "{ 'tutores': ?0}")
	 List<Bebe> buscarBebes(String tutores);
}
