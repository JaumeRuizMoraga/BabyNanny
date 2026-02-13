package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "intakerecord")
public class IntakeRecord {

    @Id
    private String id;
    private Date date;
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
