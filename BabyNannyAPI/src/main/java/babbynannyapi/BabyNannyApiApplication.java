package babbynannyapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

/**
 * Main class for the BabyNanny Spring Boot application.
 *
 * This class is annotated with @SpringBootApplication, which enables
 * component scanning, auto-configuration, and property support for the application.
 * The main method starts the Spring Boot application.
 */
@SpringBootApplication
public class BabyNannyApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BabyNannyApiApplication.class, args);
    }
}
