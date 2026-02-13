package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Token;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {
	
	@Query(value = "{ 'token': ?0}", exists = true)
    boolean buscarToken(String token);

    @Query(value = "{ 'nombreUsuario': ?0}", exists = true)
    Optional<Token> buscarUsuarioToken(String nombreUsuario);
}
