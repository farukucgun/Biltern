package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This is the service class for the user with type TeachingAssistant
 */

@Service
public class TeachingAssistantService {
    private final TeachingAssistantRepository teachingAssistantRepository;

    @Autowired
    public TeachingAssistantService(TeachingAssistantRepository teachingAssistantRepository) {
        this.teachingAssistantRepository = teachingAssistantRepository;
    }

    public List<TeachingAssistant> getTeachingAssistants() { return teachingAssistantRepository.findAll(); }

    public void addTeachingAssistant(TeachingAssistant teachingAssistant) {
        Optional<TeachingAssistant> teachingAssistantOptional = teachingAssistantRepository.findTeachingAssistantByUserName(teachingAssistant.getUserName());
        if (teachingAssistantOptional.isPresent()) {
            throw new IllegalStateException("A teaching assistant with that username already exists.");
        }
        teachingAssistantRepository.save(teachingAssistant);
    }

    public void deleteTeachingAssistant(Long id) {
        if (!teachingAssistantRepository.existsById(id)) {
            throw new IllegalStateException("A teaching assistant with that ID does not exist.");
        }
        teachingAssistantRepository.deleteById(id);
    }

    public TeachingAssistantDTO getTADetails(Long id) {
        TeachingAssistant teachingAssistant = teachingAssistantRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException()
        );

        TeachingAssistantDTO teachingAssistantDTO = new TeachingAssistantDTO();
        teachingAssistantDTO.setReportCount(teachingAssistant.getReportCount());
        teachingAssistantDTO.setDepartment(teachingAssistant.getDepartment());
        teachingAssistantDTO.setReports(getTAReports(id));

        return teachingAssistantDTO;
    }


    public List<ReportDTO> getTAReports(Long bilkentId) {

        TeachingAssistant teachingAssistant = teachingAssistantRepository.findById(bilkentId).orElseThrow(
                () -> new EntityNotFoundException()
        );

        List<ReportDTO> listOfReports = new ArrayList<>();

        for(Report report: teachingAssistant.getReports()){
            ReportDTO reportDTO = new ReportDTO();

            reportDTO.setReportStats(report.getReportStats());
            reportDTO.setReportId(reportDTO.getReportId());
            reportDTO.setDueDate(report.getDueDate());
            //reportDTO.setCourseCode(report.getCourse().getCourseCode());


            reportDTO.setGraderName(report.getGrader().getUserName());
            reportDTO.setGraderId(report.getGrader().getBilkentId());

            reportDTO.setTaId(teachingAssistant.getBilkentId());
            reportDTO.setTaName(teachingAssistant.getUserName());

            reportDTO.setStudentId(report.getStudent().getBilkentId());
            reportDTO.setStudentName(report.getStudent().getUserName());
            reportDTO.setStudentMail(report.getStudent().getBilkentMail());

            listOfReports.add(reportDTO);
        }

        return listOfReports;
    }
}
