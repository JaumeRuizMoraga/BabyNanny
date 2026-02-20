package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;

@Document(collection = "baby")
public class Baby {

    @Id
    private String id;
    private String name;
    private List<String> tutors;
    private String image;
    private List<String> intakeRecord;
    private List<String> sleepRecord;
    private List<String> medicalRecord;
    private Map<String, Object> features;
    private List<String> events;

    public Baby() {
    }
    public Baby(String id, String name, List<String> tutors, String image, List<String> intakeRecord, List<String> sleepRecord, List<String> medicalRecord, Map<String, Object> features, List<String> events) {
        this.id = id;
        this.name = name;
        this.tutors = tutors;
        this.image = image;
        this.intakeRecord = intakeRecord;
        this.sleepRecord = sleepRecord;
        this.medicalRecord = medicalRecord;
        this.features = features;
        this.events = events;
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

    public List<String> getTutors() {
        return tutors;
    }

    public void setTutors(List<String> tutors) {
        this.tutors = tutors;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getIntakeRecord() {
        return intakeRecord;
    }

    public void setIntakeRecord(List<String> intakeRecord) {
        this.intakeRecord = intakeRecord;
    }

    public List<String> getSleepRecord() {
        return sleepRecord;
    }

    public void setSleepRecord(List<String> sleepRecord) {
        this.sleepRecord = sleepRecord;
    }

    public List<String> getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(List<String> medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public Map<String, Object> getFeatures() {
        return features;
    }

    public void setFeatures(Map<String, Object> features) {
        this.features = features;
    }

    public List<String> getEvents() {
        return events;
    }

    public void setEvents(List<String> events) {
        this.events = events;
    }
}
