package cr.ac.ucr.happypet.Model.billing;

public class SimpleBill {

    private int id;
    private String receivedAt;
    private String total;

    public SimpleBill(int id, String receivedAt, String total) {
        this.id = id;
        this.receivedAt = receivedAt;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(String receivedAt) {
        this.receivedAt = receivedAt;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }
}