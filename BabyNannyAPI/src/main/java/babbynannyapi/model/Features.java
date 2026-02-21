package babbynannyapi.model;

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

	private double sleepPre;
	private double intakePre;
	private double weight;
	private double height;
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
