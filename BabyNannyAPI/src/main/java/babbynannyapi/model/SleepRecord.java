package babbynannyapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "sleeprecord")
public class SleepRecord {

    @Id
    private String id;
    private Date date;
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
