package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents a medical record of a Baby stored in the "medicalRecord" MongoDB collection.
 *
 * Each document stores information about medical treatments or prescriptions
 * given to the baby on a specific date. The record includes a Recipe object
 * that details the medicine, dosage, and administration time.
 */
@Document(collection = "medicalRecord")
public class MedicalRecord {

    /** Unique identifier of the medical record document. */
    @Id
    private String id;

    /** Date when the medical record was created or the treatment was administered. */
    private Date date;

    /** Details of the medical treatment or prescription. */
    private Recipe recipe;

    public MedicalRecord() {
    }

    public MedicalRecord(String id, Date date, Recipe recipe) {
        this.id = id;
        this.date = date;
        this.recipe = recipe;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
