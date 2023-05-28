package Caffe.BilternServer.users;


import Caffe.BilternServer.report.Report;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GraderService {

    private final GraderRepository graderRepository;

    @Autowired
    public GraderService(GraderRepository graderRepository) {
        this.graderRepository = graderRepository;
    }

    public List<Grader> getGraders() { return graderRepository.findAll(); }

    public void addGrader(Grader grader) {
        Optional<Grader> graderOptional = graderRepository.findGraderByUserName(grader.getUserName());
        if (graderOptional.isPresent()) {
            throw new IllegalStateException("A grader with that username already exists.");
        }
        graderRepository.save(grader);
    }

    public void deleteGrader(Long id) {
        if (!graderRepository.existsById(id)) {
            throw new IllegalStateException("A grader with that ID does not exist.");
        }
        graderRepository.deleteById(id);
    }

    public GraderDTO getGraderDetails(Long id) {
        Grader grader = graderRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException()
        );

        GraderDTO graderDTO = new GraderDTO();
        graderDTO.setReportCount(grader.getReportCount());
        graderDTO.setSignature(grader.getSignature());
        graderDTO.setReports(getGradersReports(grader.getBilkentId()));
        graderDTO.setDepartment(grader.getDepartment());

        return graderDTO;
    }

    public List<ReportDTO> getGradersReports(Long bilkentId) {

        Grader grader = graderRepository.findById(bilkentId).orElseThrow(
                () -> new EntityNotFoundException()
        );

        List<ReportDTO> listOfReports = new ArrayList<>();

        for(Report report: grader.getReports()){
            ReportDTO reportDTO = new ReportDTO();

            reportDTO.setReportStats(report.getReportStats());
            reportDTO.setReportId(reportDTO.getReportId());
            reportDTO.setDueDate(report.getDueDate());
            reportDTO.setCourseCode(report.getCourse().getCourseCode());

            reportDTO.setGraderName(grader.getUserName());
            reportDTO.setGraderId(grader.getBilkentId());

            reportDTO.setTaId(report.getTA().getBilkentId());
            reportDTO.setTaName(report.getTA().getUserName());

            reportDTO.setStudentId(report.getStudent().getBilkentId());
            reportDTO.setStudentName(report.getStudent().getUserName());

            listOfReports.add(reportDTO);
        }

        return listOfReports;
    }
}
