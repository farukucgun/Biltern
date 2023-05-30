package Caffe.BilternServer.report.GradingForm;

import Caffe.BilternServer.report.Report;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;


import java.util.Map;

/**
 * This is the entity class for the GradingForm object
 */

@Entity(name = "GradingForm")
@Table(name = "GradingForm")
public class GradingForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false,
            updatable = false
    )
    private Long id;

    @ElementCollection
    @MapKeyColumn(name = "gradeIndex")
    @Column(name = "value")
    private Map<String , String> grades;

    @OneToOne
    private Report report;

    public GradingForm(){};
    public GradingForm(Report report){
        this.report = report;
    }
    public Map<String, String> getGrades() {
        return grades;
    }

    public void setGrades(Map<String , String> grades) {
        this.grades = grades;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }


}

