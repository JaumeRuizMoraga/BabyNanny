package babbynannyapi.model;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tokens")
public class Token {
	
	public Token(String nombreUsuario) {
		
		String uuid = UUID.randomUUID().toString();
		this.nombreUsuario = nombreUsuario;
		this.fecha = Date.from(Instant.now());
		this.token = uuid.split("-")[0];
	}
	
	public Token() {
		
	}
	
	@Id
	private String id;
	private String token;
	private String nombreUsuario;
	private Date fecha;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getNombreUsuario() {
		return nombreUsuario;
	}
	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
