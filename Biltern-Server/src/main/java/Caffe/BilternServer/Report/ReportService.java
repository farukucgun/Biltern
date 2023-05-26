package Caffe.BilternServer.Report;

import Caffe.BilternServer.Report.Feedback.Feedback;
import Caffe.BilternServer.Report.Feedback.FeedbackRepository;
import Caffe.BilternServer.Report.GradingForm.GradingForm;
import Caffe.BilternServer.Report.GradingForm.GradingFormRepository;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.TeachingAssistant;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;


@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final FeedbackRepository feedbackRepository;
    private final GradingFormRepository gradingFormRepository;
    @Autowired
    public ReportService(
            ReportRepository reportRepository, FeedbackRepository feedbackRepository, GradingFormRepository gradingFormRepository) {
        this.reportRepository = reportRepository;
        this.feedbackRepository = feedbackRepository;
        this.gradingFormRepository = gradingFormRepository;
    }


    @Transactional
    public void addNewReport(){
        Report report = new Report();
        Feedback feedback = new Feedback();
        Feedback prevFeedback = new Feedback();
        GradingForm gradingForm = new GradingForm();

        report.setFeedback(feedback);
        feedback.setReport(report);
        prevFeedback.setReport(report);
        gradingForm.setReport(report);

        feedback.setPrev(false);
        prevFeedback.setPrev(true);

        report.setReportStats(ReportStats.NOT_SUBMITTED);
        report.setCompanyStats(CompanyStats.WAITING);

        reportRepository.save(report);
        feedbackRepository.save(feedback);
        feedbackRepository.save(prevFeedback);
        gradingFormRepository.save(gradingForm);
    }


    @Transactional
    public void setDueDate(Long reportId, LocalDate dueDate){
        Report report = reportRepository.findReportById(reportId);
        report.setDueDate(dueDate);
        reportRepository.save(report);
    }

    @Transactional
    public void setApprovalDueDate(Long reportId, LocalDate approvalDueDate){
        Report report = reportRepository.findReportById(reportId);
        report.setApprovalDueDate(approvalDueDate);
        reportRepository.save(report);
    }
    @Transactional
    public void uploadReportPDF(Long reportId, byte[] reportContent){
        Report report = reportRepository.getById(reportId);
        report.setReportPdf(reportContent);
        report.setReportStats(ReportStats.SUBMITTED);
        reportRepository.save(report);
    }

    public ByteArrayResource downloadReport(Long reportId){
        Report report = reportRepository.getById(reportId);
        byte[] reportPdf = report.getReportPdf();
        ByteArrayResource byteArrayResource = new ByteArrayResource(reportPdf);

        return byteArrayResource;
    }

    @Transactional
    public void deleteReportPDF(Long reportId){
        Report report = reportRepository.findById(reportId).get();
        report.setReportPdf(null);
        reportRepository.save(report);
    }

    @Transactional
    public void addIteration(Long reportId){
        Report report = reportRepository.getById(reportId);
        report.setIteration(true);
        Report newReport = new Report();
        newReport.setReportPdf(report.getReportPdf());
        newReport.setFeedback(report.getFeedback());
        newReport.setGradingForm(report.getGradingForm());
        newReport.setDueDate(report.getDueDate().plusDays(Long.valueOf(14)));
        newReport.setCompanyStats(report.getCompanyStats());
        newReport.setPreviousIteration(report);

        newReport.setReportStats(ReportStats.ITERATION);

        newReport = reportRepository.save(newReport);
        report.setId(newReport.getId());
        newReport.setId(reportId);

        reportRepository.save(newReport);
        reportRepository.save(report);
    }

    public ReportStats getReportStatus(Long reportId){
        return reportRepository.getById(reportId).getReportStats();
    }

    public CompanyStats getCompanyStatus(Long reportId){
        return reportRepository.getById(reportId).getCompanyStats();
    }

    @Transactional
    public void updateStatus(Long reportId, String formName){
        Report report = reportRepository.getById(reportId);
        formName = formName.toLowerCase().strip();
        if(formName.equals("company")){
            report.setCompanyStats(CompanyStats.GRADED);
        } else if (formName.equals("iteration")) {
            report.setReportStats(ReportStats.ITERATION);
        } else if (formName.equals("final")) {
            report.setReportStats(ReportStats.GRADED);
        }

    }

    public Grader getReportGrader(Long reportId){
        return reportRepository.findReportById(reportId).getGrader();
    }
    public TeachingAssistant getReportTA(Long reportId){
        return reportRepository.findReportById(reportId).getTA();
    }
}