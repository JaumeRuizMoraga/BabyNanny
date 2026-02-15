package babbynannyapi.model;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tokens")
public class Token {
	@Id
	private String id;
	private String token;
	private String user;
	private Date date;
	
	public Token(String user) {
		String uuid = UUID.randomUUID().toString();
		this.user = user;
		this.date = Date.from(Instant.now());
		this.token = uuid.split("-")[0];
	}
	
	public Token() {
	}


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
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}

}
