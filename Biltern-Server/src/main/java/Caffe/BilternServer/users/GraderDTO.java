package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import lombok.Data;

import java.io.File;
import java.util.List;

@Data
public class GraderDTO {

    private Long reportCount;
    private File signature;
    private List<Report> reports;
    private Department department;

}
