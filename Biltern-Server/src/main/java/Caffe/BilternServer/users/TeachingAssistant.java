package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class TeachingAssistant extends BilternUser {

    @Column
    private Long reportCount;

    private Department department;

    @OneToMany
    @JsonIgnore
    private List<Report> reports;

}
