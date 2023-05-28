package Caffe.BilternServer.users;

import lombok.Data;
import java.io.File;
import java.util.List;

@Data
public class GraderDTO {

    private Long reportCount;
    private byte[] signature;
    private List<ReportDTO> reports;
    private Department department;

}
