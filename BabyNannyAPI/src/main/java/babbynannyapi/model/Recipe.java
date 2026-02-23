package babbynannyapi.model;

/**
 * Represents a prescription or medication instruction for a Baby.
 *
 * This class stores the name of the medicine, the dosage amount, and
 * the number of times the dose should be administered. It is used
 * within a MedicalRecord to describe treatment details.
 */
public class Recipe{
    /** Name of the medicine. */
    private String medicine;

    /** Dosage amount of the medicine. */
    private double dosis;

    /** Number of times the dose should be administered. */
    private int dosisTime;
    public Recipe() {
    }

    public Recipe(String medicine, double dosis, int dosisTime) {
        this.medicine = medicine;
        this.dosis = dosis;
        this.dosisTime = dosisTime;
    }

    public String getMedicine() {
        return medicine;
    }

    public void setMedicine(String medicine) {
        this.medicine = medicine;
    }

    public double getDosis() {
        return dosis;
    }

    public void setDosis(double dosis) {
        this.dosis = dosis;
    }

    public int getDosisTime() {
        return dosisTime;
    }

    public void setDosisTime(int dosisTime) {
        this.dosisTime = dosisTime;
    }
}
