package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.List;

@Data
@Entity
public class Student extends BilternUser {

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    @Cascade(CascadeType.ALL)
    private List<Report> reports;

    private Department department;

}
