package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "Bebe")
public class Bebe {

    @Id
    private String id;
    private String nombre;
}
