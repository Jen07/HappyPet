package cr.ac.ucr.happypet.Service.billing.lines_service;

import java.util.List;

import cr.ac.ucr.happypet.Model.billing.Line;

public interface ILinesService {
    void saveAll(List<Line> lines);
}
