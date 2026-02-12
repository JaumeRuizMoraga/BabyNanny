package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    @Query(value = "{ 'nombre': ?0, 'password': ?1 }", exists = true)
    boolean buscarUsuario(String nombre, String password);
    
    @Query(value = "{ 'nombre': ?0, 'password': ?1, 'mail': ?2 }", exists = true)
    boolean buscarUsuario(String nombre, String password, String mail);
}

