package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

/**
 * This is the entity class for the user with type TeachingAssistant
 */

@Data
@Entity
public class TeachingAssistant extends BilternUser {

    @Column
    private Long reportCount;

    private Department department;

    @OneToMany(mappedBy = "teachingAssistant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Report> reports;

}
