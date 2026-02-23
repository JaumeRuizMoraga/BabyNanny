package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents a record of a Baby's sleep stored in the "sleepRecord" MongoDB collection.
 *
 * Each document tracks the amount of time a baby has slept on a specific date.
 * This allows monitoring sleep patterns and tracking changes over time.
 */
@Document(collection = "sleepRecord")
public class SleepRecord {


    /** Unique identifier of the sleep record document. */
    @Id
    private String id;

    /** Date when the sleep was recorded. */
    private Date date;

    /** Amount of time the baby slept (e.g., in hours). */
    private double timeSleep;

    public SleepRecord() {}

    public SleepRecord(String id, Date date, double timeSleep) {
        this.id = id;
        this.date = date;
        this.timeSleep = timeSleep;
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

    public double getTimeSleep() {
        return timeSleep;
    }

    public void setTimeSleep(double timeSleep) {
        this.timeSleep = timeSleep;
    }
}
