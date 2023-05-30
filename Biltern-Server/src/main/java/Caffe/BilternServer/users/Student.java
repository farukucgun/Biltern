package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.List;

/**
 * This is the entity class for the user with type Student
 */

@Data
@Entity
public class Student extends BilternUser {

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    @Cascade(CascadeType.ALL)
    @JsonIgnore
    private List<Report> reports;

    private Department department;

}
