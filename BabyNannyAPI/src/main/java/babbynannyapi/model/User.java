package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.data.annotation.Id;

/**
 * Represents a User in the BabyNanny application, stored in the "user" MongoDB collection.
 *
 * Each user has personal information such as name, email, and password,
 * a list of associated babies, configuration settings, and optional saved songs.
 * This class is used to manage user accounts and their relationships to babies in the system.
 */
@Document(collection = "user")
public class User {

	/** Unique identifier of the user document. */
	@Id
	private String id;

	/** Username of the user. */
	private String name;

	/** List of IDs of babies associated with this user. */
	private List<String> babies = new ArrayList<>();

	/** Password of the user (should be stored securely). */
	private String password;

	/** Email address of the user. */
	private String email;

	/** Configuration settings for the user stored as key-value pairs. */
	private Map<String, Object> config;

	/** List of song identifiers associated with the user. */
	private List<String> songs;

	public User() {}

	public User(String id, String name, List<String> babies, String password, String email, Map<String, Object> config, List<String> songs) {
		this.id = id;
		this.name = name;
		this.babies = babies;
		this.password = password;
		this.email = email;
		this.config = config;
		this.songs = songs;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getBabies() {
		return babies;
	}

	public void setBabies(List<String> babies) {
		this.babies = babies;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getSongs() {
		return songs;
	}

	public void setSongs(List<String> songs) {
		this.songs = songs;
	}

	public Map<String, Object> getConfig() {
		return config;
	}
	public void setConfig(Map<String, Object> config) {
		this.config = config;
	}
}
