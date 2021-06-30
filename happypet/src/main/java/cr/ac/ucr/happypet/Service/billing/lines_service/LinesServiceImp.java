package cr.ac.ucr.happypet.Service.billing.lines_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cr.ac.ucr.happypet.Model.billing.Line;
import cr.ac.ucr.happypet.Repository.billing.LinesRepository;

@Service
public class LinesServiceImp implements ILinesService{
    
    @Autowired
    LinesRepository repo;

    @Override
    public void saveAll(List<Line> lines) {
        repo.saveAll(lines);
    }

}
