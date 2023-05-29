package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.report.ReportStats;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author jmo
 * @date 28.05.2023
 */

@Data
public class ReportDTO {
    private String courseCode;
    private LocalDate dueDate;
    private String studentName;
    private String graderName;
    private String taName;

    private String studentMail;
    private ReportStats reportStats;
    private Long reportId;
    private Long taId;
    private Long studentId;
    private Long graderId;

    public ReportDTO(Report report) {
        this.courseCode = report.getCourse().getCourseCode();
        this.dueDate = report.getDueDate();
        this.reportStats = report.getReportStats();
        this.reportId = report.getId();
        this.taId = report.getTeachingAssistant().getBilkentId();
        this.studentId = report.getStudent().getBilkentId();
        this.graderId = report.getGrader().getBilkentId();
        courseCode = report.getCourse().getCourseCode();
        studentMail = report.getStudent().getBilkentMail();
        studentId = report.getStudent().getBilkentId();
        studentName = report.getStudent().getUserName();
        graderName = report.getGrader().getUserName();
        taName = report.getTeachingAssistant().getUserName();

    }

    public  ReportDTO(){

    }

}
