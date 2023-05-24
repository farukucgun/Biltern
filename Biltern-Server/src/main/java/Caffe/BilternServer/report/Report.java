package Caffe.BilternServer.report;

import Caffe.BilternServer.report.Feedback.Feedback;
import Caffe.BilternServer.report.GradingForm.GradingForm;
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
            nullable = false,
            updatable = false
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

//    @ManyToOne
//    @JoinColumn(name = "student_id")
//    private Student student;


    @JsonIgnore
    private boolean isIteration;
    @OneToOne(mappedBy = "Report", cascade = CascadeType.ALL)
    @JoinColumn(name = "feedbackId")
    private Feedback feedback;

    @OneToOne
    @JoinColumn(name = "gradingFormId")
    private GradingForm gradingForm;

    @OneToOne(mappedBy = "Report")
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

}
