package babbynannyapi.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "featuresRecord")
public class FeaturesRecord {
	
	public FeaturesRecord() {
	}

	public FeaturesRecord(Features features) {
		this.date = new Date();
		this.features = features;
	}

	@Id
	private String id;
	private Date date;
	private Features features;

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

	public Features getFeatures() {
		return features;
	}

	public void setFeatures(Features features) {
		this.features = features;
	}
}
