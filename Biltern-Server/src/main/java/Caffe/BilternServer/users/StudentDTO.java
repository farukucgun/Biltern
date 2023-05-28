package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import lombok.Data;
import java.util.List;

/**
 * @author jmo
 * @date 28.05.2023
 */

@Data
public class StudentDTO {

    private Department department;
    private List<Report> reports;
}
