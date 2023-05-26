package Caffe.BilternServer.Course;

import Caffe.BilternServer.Report.Report;
import Caffe.BilternServer.users.Student;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Course")
@Table(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false,
            updatable = false
    )
    private Long id;

    @Column(unique = true, nullable = false)
    private String courseCode;

    @OneToMany
    private List<Report> reports;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }
}
