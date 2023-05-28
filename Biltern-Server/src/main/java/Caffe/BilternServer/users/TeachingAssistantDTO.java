package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import lombok.Data;

import java.util.List;

@Data
public class TeachingAssistantDTO {

    private Long reportCount;
    private List<Report> reports;

}
