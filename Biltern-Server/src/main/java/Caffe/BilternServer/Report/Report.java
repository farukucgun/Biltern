package Caffe.BilternServer.Report;

import Caffe.BilternServer.Report.Feedback.Feedback;
import Caffe.BilternServer.Report.GradingForm.GradingForm;
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

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @OneToOne
    @JoinColumn(name = "graderId")
    private Grader grader;

    @OneToOne
    @JoinColumn(name = "TAId")
    private TeachingAssistant TA;
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

}

