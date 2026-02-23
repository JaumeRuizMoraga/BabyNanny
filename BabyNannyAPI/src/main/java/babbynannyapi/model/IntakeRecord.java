package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents a record of a Baby's intake stored in the "intakeRecord" MongoDB collection.
 *
 * Each document tracks the amount of intake (e.g., milk or food) consumed
 * by the baby on a specific date. This allows monitoring feeding patterns
 * and nutritional history over time.
 */
@Document(collection = "intakeRecord")
public class IntakeRecord {

    /** Unique identifier of the intake record document. */
    @Id
    private String id;

    /** Date when the intake was recorded. */
    private Date date;

    /** Amount of intake (e.g., in milliliters or grams). */
    private double intakeAmount;

    public IntakeRecord() {}

    public IntakeRecord(String id, Date date, double intakeAmount) {
        this.id = id;
        this.date = date;
        this.intakeAmount = intakeAmount;
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

    public double getIntakeAmount() {
        return intakeAmount;
    }

    public void setIntakeAmount(double intakeAmount) {
        this.intakeAmount = intakeAmount;
    }
}
