package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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
}
