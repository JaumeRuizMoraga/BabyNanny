package babbynannyapi.model;

public class Config {

	public Config(String idioma) {
		this.idioma = idioma;
	}

	public Config() {

	}

	private String idioma;

	public String getIdioma() {
		return idioma;
	}

	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}
}
