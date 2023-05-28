package Caffe.BilternServer.users;

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
    private ReportStats reportStats;
    private Long reportId;
    private Long taId;
    private Long studentId;
    private Long graderId;
}
