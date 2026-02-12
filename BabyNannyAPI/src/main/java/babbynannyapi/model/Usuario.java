package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

@Document(collection = "usuario")
public class Usuario {
	@Id
	private String id;
	private String nombre;
	private String [] bebes;
	private String password;
	private String correo;
	private Config config;
	private String [] canciones;

	public Usuario() {}

	public Usuario(String nombre, String password) {
		this.nombre = nombre;
		this.password = password;
	}

	public Usuario(String id, String nombre, String[] bebes, String password, String correo, Config config, String[] canciones) {
		this.id = id;
		this.nombre = nombre;
		this.bebes = bebes;
		this.password = password;
		this.correo = correo;
		this.config = config;
		this.canciones = canciones;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String[] getBebes() {
		return bebes;
	}

	public void setBebes(String[] bebes) {
		this.bebes = bebes;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String[] getCanciones() {
		return canciones;
	}

	public void setCanciones(String[] canciones) {
		this.canciones = canciones;
	}

	public Config getConfig() {
		return config;
	}

	public void setConfig(Config config) {
		this.config = config;
	}
}
