package Caffe.BilternServer.users;

import Caffe.BilternServer.Course.Course;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class Student extends BilternUser {

    @Column
    private String department;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grader")
    @JsonIgnore
    private Grader grader;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "TA")
    @JsonIgnore
    private TeachingAssistant teachingAssistant;

    @ManyToMany
    @JoinTable(
            name = "courses_taken",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Grader getGrader() {
        return grader;
    }

    public void setGrader(Grader grader) {
        this.grader = grader;
    }

    public TeachingAssistant getTeachingAssistant() {
        return teachingAssistant;
    }

    public void setTeachingAssistant(TeachingAssistant teachingAssistant) {
        this.teachingAssistant = teachingAssistant;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
