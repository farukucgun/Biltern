package Caffe.BilternServer.users;

import lombok.Data;
import java.io.File;
import java.util.List;

/**
 * This is the DTO (Data Transfer Object) class for the user with type Grader
 */

@Data
public class GraderDTO {

    private Long reportCount;
    private List<ReportDTO> reports;
    private Department department;

}
