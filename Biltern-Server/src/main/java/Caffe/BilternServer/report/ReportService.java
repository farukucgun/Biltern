package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.course.CourseService;
import Caffe.BilternServer.report.Feedback.Feedback;
import Caffe.BilternServer.report.Feedback.FeedbackRepository;
import Caffe.BilternServer.report.GradingForm.GradingForm;
import Caffe.BilternServer.report.GradingForm.GradingFormRepository;
import Caffe.BilternServer.users.Department;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.TeachingAssistant;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final FeedbackRepository feedbackRepository;
    private final GradingFormRepository gradingFormRepository;
    private final CourseService courseService;

    @Autowired
    public ReportService(
            ReportRepository reportRepository,
            FeedbackRepository feedbackRepository,
            GradingFormRepository gradingFormRepository,
            CourseService courseService) {
        this.reportRepository = reportRepository;
        this.feedbackRepository = feedbackRepository;
        this.gradingFormRepository = gradingFormRepository;
        this.courseService = courseService;
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
        Report report = reportRepository.findReportByIdAndIsIteration(reportId, false);
        report.setDueDate(dueDate);
        reportRepository.save(report);
    }

    @Transactional
    public void setApprovalDueDate(Long reportId, LocalDate approvalDueDate){
        Report report = reportRepository.findReportByIdAndIsIteration(reportId, false);
        report.setApprovalDueDate(approvalDueDate);
        reportRepository.save(report);
    }
    @Transactional
    public void uploadReportPDF(Long reportId, byte[] reportContent){
        Report report = reportRepository.getById(reportId);
        report.setReportPdf(reportContent);
        if(report.getReportStats() == ReportStats.ITERATION){
            report.setReportStats(ReportStats.ITERATION_SUBMITTED);
        }
        else{
            report.setReportStats(ReportStats.SUBMITTED);
        }
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
        if(report.getReportStats() == ReportStats.ITERATION_SUBMITTED){
            report.setReportStats(ReportStats.ITERATION);
        }else{
            report.setReportStats(ReportStats.NOT_SUBMITTED);
        }
        reportRepository.save(report);
    }

    @Transactional
    public void deleteReportFeedback(Long reportId){
        Report report = reportRepository.findById(reportId).get();
        report.setFeedback(null);
        feedbackRepository.deleteByReportIdAndReport_isIteration(reportId, false);
        report.setReportStats(ReportStats.ITERATION_SUBMITTED);
        reportRepository.save(report);
    }

    @Transactional
    public void addIteration(Long reportId){
        Report report = reportRepository.getById(reportId);
        report.setIteration(true);
        Report newReport = new Report(report);

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
    public void updateStatusGradingForm(Long reportId, String formName){
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
        return reportRepository.findReportByIdAndIsIteration(reportId, false).getGrader();
    }
    public TeachingAssistant getReportTA(Long reportId){
        return reportRepository.findReportByIdAndIsIteration(reportId, false).getTeachingAssistant();
    }

    public LocalDate getDueDate(Long reportId){
        return reportRepository.getById(reportId).getDueDate();
    }

    public Map<ReportStats, Integer> getGraderStats(Grader grader) {
        Map<ReportStats, Integer> graderStats = new HashMap<>();

        for(ReportStats reportStats: ReportStats.values()){
            graderStats.put(reportStats, reportRepository.countAllByGraderAndReportStatsAndIsIteration(grader, reportStats,false));
        }

        return graderStats;
    }


    public Map<ReportStats, Integer> getTAStats(TeachingAssistant teachingAssistant) {
        Map<ReportStats, Integer> taStats= new HashMap<>();

        for(ReportStats reportStats: ReportStats.values()){
            taStats.put(reportStats, reportRepository.countAllByTeachingAssistantAndReportStatsAndIsIteration(teachingAssistant, reportStats, false));
        }

        return taStats;
    }


    public List<Map<ReportStats, Integer>> getDepartmentStats(Department department){


        Course course299, course399;

        try {
            course299 = courseService.getCourseByCode(department + "299");
            course399 = courseService.getCourseByCode(department + "399");

        }
        catch (EntityNotFoundException entityNotFoundException){
            return List.of(new HashMap<>(), new HashMap<>());
        }

        List<Map<ReportStats, Integer>> departmentStats = new ArrayList<>();

        Map<ReportStats, Integer> courseStats299 = new HashMap<>();
        Map<ReportStats, Integer> courseStats399 = new HashMap<>();


        for(ReportStats reportStats: ReportStats.values()){
            courseStats299.put(reportStats, reportRepository.countAllByCourseAndReportStatsAndIsIteration(
                    course299, reportStats, false
            ));
            courseStats399.put(reportStats, reportRepository.countAllByCourseAndReportStatsAndIsIteration(
                    course399, reportStats, false
            ));
        }

        departmentStats.add(courseStats299);
        departmentStats.add(courseStats399);

        return departmentStats;
    }

    public LocalDate getapprovalDueDate(Long reportId){
        return reportRepository.getById(reportId).getApprovalDueDate();
    }
}