package babbynannyapi.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Represents a Baby entity stored in the "baby" MongoDB collection.
 *
 * This class models all information related to a baby, including personal data,
 * associated tutors, image, and various types of records such as intake, sleep,
 * and medical records. It also keeps track of feature history and events.
 *
 * The class is designed to be stored as a document in MongoDB using Spring Data.
 */

@Document(collection = "baby")
public class Baby {

    /** Unique identifier of the baby. */
    @Id
    private String id;

    /** Name of the baby. */
    private String name;

    /** List of usernames or identifiers of the baby's tutors. */
    private List<String> tutors = new ArrayList<>();

    /** URL or path to the baby's image. */
    private String image;

    /** List of IDs referencing the baby's intake records. */
    private List<String> intakeRecord = new ArrayList<>();

    /** List of IDs referencing the baby's sleep records. */
    private List<String> sleepRecord = new ArrayList<>();

    /** List of IDs referencing the baby's medical records. */
    private List<String> medicalRecord = new ArrayList<>();

    /** Current features of the baby. */
    private Features features;

    /** History of features stored as a list of FeaturesRecord IDs. */
    private List<String> featuresRecord = new ArrayList<>();

    /** Events associated with the baby. */
    private Event events;

    /** Default constructor for serialization. */
    public Baby() {
    }

    public Baby(String id, String name, List<String> tutors, String image, List<String> intakeRecord, List<String> sleepRecord, List<String> medicalRecord, Features features,List<String> featuresRecord, Event events) {
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

    public Event getEvents() {
        return events;
    }

    public void setEvents(Event events) {
        this.events = events;
    }
	public List<String> getFeaturesRecord() {
		return featuresRecord;
	}
	public void setFeaturesRecord(List<String> featuresRecord) {
		this.featuresRecord = featuresRecord;
	}
}
