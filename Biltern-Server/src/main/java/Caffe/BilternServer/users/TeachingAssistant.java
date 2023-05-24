package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class TeachingAssistant extends BilternUser {

    @Column
    private Long reportCount;

    @OneToMany(mappedBy = "TA")
    @JsonIgnore
    private List<Student> students;

    public Long getReportCount() {
        return reportCount;
    }

    public void setReportCount(Long reportCount) {
        this.reportCount = reportCount;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
