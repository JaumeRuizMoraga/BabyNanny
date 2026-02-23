package babbynannyapi.model;

/**
 * Represents the features or characteristics of a baby.
 *
 * This class stores basic measurable attributes such as sleep,
 * intake, weight, height, and age. It can be used to track
 * a baby's development and current status.
 */

public class Features {

	public Features() {
	}

	public Features(double sleepPre, double intakePre, double weight, double height, double age) {
		this.sleepPre = sleepPre;
		this.intakePre = intakePre;
		this.weight = weight;
		this.height = height;
		this.age = age;
	}

	/** Average or predicted sleep duration. */
	private double sleepPre;

	/** Average or predicted intake amount. */
	private double intakePre;

	/** Baby's weight. */
	private double weight;

	/** Baby's height. */
	private double height;

	/** Baby's age. */
	private double age;

	public double getSleepPre() {
		return sleepPre;
	}

	public void setSleepPre(double sleepPre) {
		this.sleepPre = sleepPre;
	}

	public double getIntakePre() {
		return intakePre;
	}

	public void setIntakePre(double intakePre) {
		this.intakePre = intakePre;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getAge() {
		return age;
	}

	public void setAge(double age) {
		this.age = age;
	}
}
