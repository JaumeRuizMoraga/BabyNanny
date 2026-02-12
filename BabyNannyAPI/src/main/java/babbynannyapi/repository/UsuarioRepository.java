
package babbynannyapi.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

	@Query(value = "{ 'name': ?0, 'pwss': ?1 }", exists = true)
    boolean buscarUsuario(String name, String pwss);
    
}