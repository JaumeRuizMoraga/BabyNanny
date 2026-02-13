package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

@Document(collection = "bebe")
public class Bebe {

    @Id
    private String id;
    private String nombre;
    private List<String> tutores;
    private String imagen;
    private List<Byte> icon;
    private List<String> intakeRecord;
    private List<String> sleeprecord;
    private List<String> medicalRecord;
    private Map<String, Object> caracteristicas;
    private List<String> eventos;

    public Bebe() {
    }

    public Bebe(String id, String nombre, List<String> tutores, String imagen, List<Byte> icon, List<String> intakeRecord, List<String> sleeprecord, List<String> medicalRecord, Map<String, Object> caracteristicas, List<String> eventos) {
        this.id = id;
        this.nombre = nombre;
        this.tutores = tutores;
        this.imagen = imagen;
        this.icon = icon;
        this.intakeRecord = intakeRecord;
        this.sleeprecord = sleeprecord;
        this.medicalRecord = medicalRecord;
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

    public List<String> getTutores() {
        return tutores;
    }

    public void setTutores(List<String> tutores) {
        this.tutores = tutores;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<Byte> getIcon() {
        return icon;
    }

    public void setIcon(List<Byte> icon) {
        this.icon = icon;
    }

    public List<String> getIntakeRecord() {
        return intakeRecord;
    }

    public void setIntakeRecord(List<String> intakeRecord) {
        this.intakeRecord = intakeRecord;
    }

    public List<String> getSleeprecord() {
        return sleeprecord;
    }

    public void setSleeprecord(List<String> sleeprecord) {
        this.sleeprecord = sleeprecord;
    }

    public List<String> getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(List<String> medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public Map<String, Object> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Map<String, Object> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public List<String> getEventos() {
        return eventos;
    }

    public void setEventos(List<String> eventos) {
        this.eventos = eventos;
    }
}
