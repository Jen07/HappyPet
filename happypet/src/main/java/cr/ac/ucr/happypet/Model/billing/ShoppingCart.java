package cr.ac.ucr.happypet.Model.billing;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class ShoppingCart {

    private HashMap<Long, Line> lines;

    public ShoppingCart(){
        lines = new HashMap<>();
    }

    public HashMap<Long, Line> getLines() {
        return lines;
    }

    public List<Line> getListLines(){
        return new LinkedList<Line>(lines.values());
    }

    public void setLines(HashMap<Long, Line> lines) {
        this.lines = lines;
    }

    public void addLine(Line line){
        long id = line.getProduct().getCod_product();

        if(lines.containsKey(id)){            
            lines.get(id).addQuantity(line.getQuantity());
        }else{
            lines.put(id, line);
        }
    }

    public int getTotal(){
        int total = 0;

        for(Map.Entry<Long, Line> entry : lines.entrySet()){
            total += entry.getValue().getTotal();
        }
        return total;
    }

    public String getTotalString() {
        DecimalFormat format = new DecimalFormat("#,###.00");
        String formatted = format.format(getTotal());
        return (String.format("₡%s", formatted));
    }

    public int getSize(){
        return lines.size();
    }

    public void removeAll() {
        lines.clear();
    }

    public void removeLine(long id) {
        if(lines.containsKey(id)){            
            lines.remove(id);
        }
    }

}