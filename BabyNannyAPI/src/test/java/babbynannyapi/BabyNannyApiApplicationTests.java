package babbynannyapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.bson.assertions.Assertions.assertNotNull;

@SpringBootTest
class MongoConnectionTest {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    void testConnection() {
        // Intenta obtener el nombre de la base de datos
        String dbName = mongoTemplate.getDb().getName();
        System.out.println("Conexión exitosa a la base de datos: " + dbName + "!");
        assertNotNull(dbName);
    }
}
