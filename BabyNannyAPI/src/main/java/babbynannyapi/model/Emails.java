package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents an email verification entry stored in the "emails" MongoDB collection.
 *
 * Each document contains a verification code and the associated email address.
 * This class is used during user registration or verification processes to
 * temporarily store codes until they are validated.
 */

@Document(collection = "emails")
public class Emails {

	/** Default constructor for serialization. */
	public Emails() {
	}

	public Emails(String code, String email) {
		this.code = code;
		this.email = email;
	}

	/** Unique identifier of the email document. */
	@Id
	private String id;

	/** Verification code associated with the email. */
	private String code;

	/** Email address to be verified. */
	private String email;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
