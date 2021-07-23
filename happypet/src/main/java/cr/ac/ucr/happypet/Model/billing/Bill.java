package cr.ac.ucr.happypet.Model.billing;

import java.sql.Date;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import cr.ac.ucr.happypet.Model.animals.Service;
import cr.ac.ucr.happypet.Model.users.User;

@Entity
@Table(name = "tb_bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date receivedAt;

    private int archived = 0;

    @ManyToOne
    @JoinColumn(name = "idClient")
    private User client;

    @OneToMany(mappedBy = "bill")
    private List<Line> lines;

    @OneToMany(mappedBy = "bill")
    private List<Service> services;

    public void addLine(Line line) {
        lines.add(line);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getReceivedAt() {
        return receivedAt;
    }

    public String getFormattedDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        return format.format(receivedAt);
    }

    public void setReceivedAt(Date receivedAt) {
        this.receivedAt = receivedAt;
    }

    public User getClient() {
        return client == null ? new User() : client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public List<Line> getLines() {
        return lines == null ? new LinkedList<>() : lines;
    }

    public void setLines(List<Line> lines) {
        this.lines = lines;
    }

    public List<Service> getServices() {
        return services == null ? new LinkedList<>() : services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public int getTotal() {
        int total = 0;

        for (Line line : lines) {
            total += line.getTotal();
        }

        return total;
    }

    public int getArchived() {
        return archived;
    }

    public void setArchived(int archived) {
        this.archived = archived;
    }

    public String getTotalString() {
        DecimalFormat format = new DecimalFormat("#,###.00");
        String formatted = format.format(getTotal());
        return (String.format("₡%s", formatted));
    }

}