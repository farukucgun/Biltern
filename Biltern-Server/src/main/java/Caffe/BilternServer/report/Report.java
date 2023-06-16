package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.report.Feedback.Feedback;
import Caffe.BilternServer.report.GradingForm.GradingForm;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.Student;
import Caffe.BilternServer.users.TeachingAssistant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * This is the entity class for the Report object
 */

@Data
@Entity(name = "Report")
@Table(name = "Report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false
    )
    private Long id;
    private LocalDate dueDate;

    private LocalDate approvalDueDate;

    @JsonIgnore
    private boolean isIteration;
    @JsonIgnore
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "LONGBLOB")
    private byte[] reportPdf;
    @Enumerated(EnumType.STRING)
    private ReportStats reportStats;

    @Enumerated(EnumType.STRING)
    private CompanyStats companyStats;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentId")
    private Student student;


    @ManyToOne
    @JoinColumn(name = "graderId")
    private Grader grader;


    @ManyToOne
    @JoinColumn(name = "teachingAssistantId")
    private TeachingAssistant teachingAssistant;


    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    @OneToMany(mappedBy = "report",cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;
    @OneToOne(mappedBy = "report", cascade = CascadeType.ALL)
    @JoinColumn(name = "gradingFormId")
    private GradingForm gradingForm;


    @OneToOne
    @JoinColumn(name = "previousIterationId")
    private Report previousIteration;

    public Report(){
        feedbacks = new ArrayList<Feedback>();
        feedbacks.add(new Feedback(this, false));
        feedbacks.add(new Feedback(this, true));
        gradingForm = new GradingForm(this);
        reportStats = ReportStats.NOT_SUBMITTED;
        companyStats = CompanyStats.WAITING;
    }


    public Report(Report newReport) {
        this.dueDate = newReport.dueDate;
        this.approvalDueDate = newReport.approvalDueDate;
        this.isIteration = newReport.isIteration;
        this.reportPdf = newReport.reportPdf;
        this.reportStats = newReport.reportStats;
        this.companyStats = newReport.companyStats;
        this.student = newReport.student;
        this.grader = newReport.grader;
        this.teachingAssistant = newReport.teachingAssistant;
        this.course = newReport.course;
        this.previousIteration = newReport.previousIteration;

        feedbacks = new ArrayList<Feedback>();

        Feedback feedback = new Feedback(this, false);
        Feedback prevFeedback = new Feedback(this, true);
        if(newReport.getFeedback() != null){
            feedback.setPdfData(newReport.getFeedback().getPdfData());
        }
        if(newReport.getPrevFeedback() != null){
            prevFeedback.setPdfData(newReport.getPrevFeedback().getPdfData());
        }
        feedbacks.add(feedback);
        feedbacks.add(prevFeedback);
        gradingForm = newReport.getGradingForm();
    }

    public Feedback getFeedback(){
        for(Feedback f : feedbacks){
            if(!f.isPrev()){
                return f;
            }
        }
        return null;
    }

    public void setFeedback(Feedback newFeedback){
        for(Feedback f : feedbacks){
            if(!f.isPrev()){
               f = newFeedback;
               f.setPrev(true);
               f.setReport(this);
               return;
            }
        }
    }
    public Feedback getPrevFeedback(){
        for(Feedback f : feedbacks){
            if(f.isPrev()){
                return f;
            }
        }
        return null;
    }

    public void setPrevFeedback(Feedback newFeedback){
        for(Feedback f : feedbacks){
            if(f.isPrev()){
                f = newFeedback;
                f.setReport(this);
                f.setPrev(true);
                return;
            }
        }
    }
}

