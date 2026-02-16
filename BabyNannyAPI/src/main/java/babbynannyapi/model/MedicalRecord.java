package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "medicalRecord")
public class MedicalRecord {

    @Id
    private String id;
    private Date date;
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
