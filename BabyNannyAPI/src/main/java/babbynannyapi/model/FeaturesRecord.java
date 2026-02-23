package babbynannyapi.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a historical record of a Baby's features.
 *
 * Each document stores the features of a baby at a specific point in time,
 * along with the date the record was created. This allows tracking
 * the baby's development and changes in attributes such as weight, height,
 * sleep, and intake over time.
 */

@Document(collection = "featuresRecord")
public class FeaturesRecord {
	
	public FeaturesRecord() {
	}

	public FeaturesRecord(Features features) {
		this.date = new Date();
		this.features = features;
	}

	/** Unique identifier of the feature record document. */
	@Id
	private String id;

	/** Date when this features record was created. */
	private Date date;

	/** Snapshot of the baby's features at the time of record creation. */
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
