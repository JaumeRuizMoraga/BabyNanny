package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Token;
import babbynannyapi.model.Usuario;

public interface TokenRepository extends MongoRepository<Token, String> {
    
}
