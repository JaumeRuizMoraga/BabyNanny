package babbynannyapi.model;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents an authentication token for a user, stored in the "tokens" MongoDB collection.
 *
 * Each token is linked to a specific user and includes a creation date.
 * The token string is generated as the first segment of a UUID to provide a
 * unique identifier for authentication purposes.
 */
@Document(collection = "tokens")
public class Token {
	/** Unique identifier of the token document. */
	@Id
	private String id;

	/** The token string used for authentication. */
	private String token;

	/** Username of the user associated with this token. */
	private String user;

	/** Date when the token was created. */
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
