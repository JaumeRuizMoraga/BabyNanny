package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "baby")
public class Baby {

    @Id
    private String id;
    private String name;
    private List<String> tutors = new ArrayList<>();
    private String image;
    private List<String> intakeRecord = new ArrayList<>();
    private List<String> sleepRecord = new ArrayList<>();
    private List<String> medicalRecord = new ArrayList<>();
    private Features features;
    private List<String> featuresRecord = new ArrayList<>();
    private List<Event> events = new ArrayList<Event>();

    public Baby() {
    }
    public Baby(String id, String name, List<String> tutors, String image, List<String> intakeRecord, List<String> sleepRecord, List<String> medicalRecord, Features features,List<String> featuresRecord, List<Event> events) {
        this.id = id;
        this.name = name;
        this.tutors = tutors;
        this.image = image;
        this.intakeRecord = intakeRecord;
        this.sleepRecord = sleepRecord;
        this.medicalRecord = medicalRecord;
        this.features = features;
        this.featuresRecord = featuresRecord;
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

    public Features getFeatures() {
        return features;
    }

    public void setFeatures(Features features) {
        this.features = features;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
	public List<String> getFeaturesRecord() {
		return featuresRecord;
	}
	public void setFeaturesRecord(List<String> featuresRecord) {
		this.featuresRecord = featuresRecord;
	}
}
