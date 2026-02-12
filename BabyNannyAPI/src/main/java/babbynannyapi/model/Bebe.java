package babbynannyapi.model;

import org.bson.json.JsonObject;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;

@Document(collection = "bebe")
public class Bebe {

    @Id
    private String id;
    private String nombre;
    private String madre;
    private String padre;
    private String imagen;
    private Byte [] icon;
    private String registroTomas;
    private String registroSueño;
    private String registroMedico;
    private JsonObject caracteristicas;
    private String eventos;

    public Bebe() {
    }

    public Bebe(String id, String nombre, String madre, String padre, String imagen, Byte[] icon, String registroTomas, String registroSueño, String registroMedico, JsonObject caracteristicas, String eventos) {
        this.id = id;
        this.nombre = nombre;
        this.madre = madre;
        this.padre = padre;
        this.imagen = imagen;
        this.icon = icon;
        this.registroTomas = registroTomas;
        this.registroSueño = registroSueño;
        this.registroMedico = registroMedico;
        this.caracteristicas = caracteristicas;
        this.eventos = eventos;
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

    public String getMadre() {
        return madre;
    }

    public void setMadre(String madre) {
        this.madre = madre;
    }

    public String getPadre() {
        return padre;
    }

    public void setPadre(String padre) {
        this.padre = padre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Byte[] getIcon() {
        return icon;
    }

    public void setIcon(Byte[] icon) {
        this.icon = icon;
    }

    public String getRegistroTomas() {
        return registroTomas;
    }

    public void setRegistroTomas(String registroTomas) {
        this.registroTomas = registroTomas;
    }

    public String getRegistroSueño() {
        return registroSueño;
    }

    public void setRegistroSueño(String registroSueño) {
        this.registroSueño = registroSueño;
    }

    public String getRegistroMedico() {
        return registroMedico;
    }

    public void setRegistroMedico(String registroMedico) {
        this.registroMedico = registroMedico;
    }

    public JsonObject getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(JsonObject caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public String getEventos() {
        return eventos;
    }

    public void setEventos(String eventos) {
        this.eventos = eventos;
    }
}
