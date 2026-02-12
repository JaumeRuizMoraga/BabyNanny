package babbynannyapi.model;

import org.springframework.data.annotation.Id;

public class Cancion {

	public Cancion(String nombre, String uri) {
		this.nombre = nombre;
		this.uri = uri;
	}

	public Cancion() {

	}

	@Id
	private String id;
	private String nombre;
	private String uri;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
