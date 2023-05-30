package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import lombok.Data;
import java.util.List;

/**
 * This is the DTO (Data Transfer Object) class for the user with type Student
 */

@Data
public class StudentDTO {

    private Department department;
    private List<ReportDTO> reports;
}
