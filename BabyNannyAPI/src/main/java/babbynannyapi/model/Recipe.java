package babbynannyapi.model;

public class Recipe{

    private String medicine;
    private double dosis;
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
