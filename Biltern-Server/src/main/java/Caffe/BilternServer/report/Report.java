package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.report.Feedback.Feedback;
import Caffe.BilternServer.report.GradingForm.GradingForm;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.Student;
import Caffe.BilternServer.users.TeachingAssistant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;


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
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] reportPdf;
    @Enumerated(EnumType.STRING)
    private ReportStats reportStats;

    @Enumerated(EnumType.STRING)
    private CompanyStats companyStats;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentId")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "graderId")
    private Grader grader;

    @ManyToOne
    @JoinColumn(name = "TAId")
    private TeachingAssistant TA;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    @JsonIgnore
    private boolean isIteration;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "feedbackId")
    private Feedback feedback;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gradingFormId")
    private GradingForm gradingForm;

    @OneToOne
    @JoinColumn(name = "previousIterationId")
    private Report previousIteration;

    public Report(){
        reportStats = ReportStats.NOT_SUBMITTED;
        companyStats = CompanyStats.WAITING;
    }
    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getApprovalDueDate() {
        return approvalDueDate;
    }

    public void setApprovalDueDate(LocalDate approvalDueDate) {
        this.approvalDueDate = approvalDueDate;
    }

    public ReportStats getReportStats() {
        return reportStats;
    }

    public void setReportStats(ReportStats reportStats) {
        this.reportStats = reportStats;
    }

    public CompanyStats getCompanyStats() {
        return companyStats;
    }

    public void setCompanyStats(CompanyStats companyStats) {
        this.companyStats = companyStats;
    }

    public boolean isIteration() {
        return isIteration;
    }

    public void setIteration(boolean iteration) {
        isIteration = iteration;
    }

    public GradingForm getGradingForm() {
        return gradingForm;
    }

    public void setGradingForm(GradingForm gradingForm) {
        this.gradingForm = gradingForm;
    }

    public Report getPreviousIteration() {
        return previousIteration;
    }

    public void setPreviousIteration(Report previousIteration) {
        this.previousIteration = previousIteration;
    }

    public Long getId(){
        return id;
    }

    public byte[] getReportPdf() {
        return reportPdf;
    }

    public void setReportPdf(byte[] reportPdf) {
        this.reportPdf = reportPdf;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Grader getGrader() {
        return grader;
    }

    public void setGrader(Grader grader) {
        this.grader = grader;
    }

    public TeachingAssistant getTA() {
        return TA;
    }

    public void setTA(TeachingAssistant TA) {
        this.TA = TA;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}

