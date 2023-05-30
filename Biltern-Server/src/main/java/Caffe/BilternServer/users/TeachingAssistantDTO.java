package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import lombok.Data;

import java.util.List;

/**
 * This is the DTO (Data Transfer Object) class for the user with type TeachingAssistant
 */

@Data
public class TeachingAssistantDTO {

    private Long reportCount;
    private List<ReportDTO> reports;

    private Department department;

}
