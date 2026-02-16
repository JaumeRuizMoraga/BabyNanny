package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;
import org.springframework.data.annotation.Id;

@Document(collection = "user")
public class User {
	
	@Id
	private String id;
	private String name;
	private List<String> babies;
	private String password;
	private String email;
	private Map<String, Object> config;
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
