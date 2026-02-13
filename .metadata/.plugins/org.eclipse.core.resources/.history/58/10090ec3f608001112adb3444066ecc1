package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import babbynannyapi.model.Usuario;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Usuario, String> {

    @Query
    Optional<Usuario> findByNombreAndPassword(String nombre, String password);

    @Query(value = "{ 'nombre': ?0, 'password': ?1, 'correo': ?2 }")
    Optional<Usuario> searchUserPassEmail(String nombre, String password, String correo);
}