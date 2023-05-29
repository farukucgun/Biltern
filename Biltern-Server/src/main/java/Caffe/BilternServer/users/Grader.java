package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

/**
 * This is the entity class for the user with type Grader
 */

@Data
@Entity
public class Grader extends BilternUser {

    @Column
    private Long reportCount;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] signature;

    @OneToMany(mappedBy = "grader", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Report> reports;
    private Department department;
}
