package babbynannyapi.model;

public class Config {
    private String idioma;

    public Config(String idioma) {
        this.idioma = idioma;
    }

    public Config() {
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }
}
