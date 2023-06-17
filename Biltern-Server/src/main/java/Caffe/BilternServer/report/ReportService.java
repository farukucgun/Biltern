package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.course.CourseService;
import Caffe.BilternServer.notification.NotificationService;
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

/**
 * This is the service class for the Report object
 */

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final FeedbackRepository feedbackRepository;
    private final GradingFormRepository gradingFormRepository;
    private final CourseService courseService;
    private final NotificationService notificationService;

    @Autowired
    public ReportService(
            ReportRepository reportRepository,
            FeedbackRepository feedbackRepository,
            GradingFormRepository gradingFormRepository,
            CourseService courseService,
            NotificationService notificationService) {
        this.reportRepository = reportRepository;
        this.feedbackRepository = feedbackRepository;
        this.gradingFormRepository = gradingFormRepository;
        this.courseService = courseService;
        this.notificationService = notificationService;
    }

    @Transactional
    public void setDueDate(Long reportId, LocalDate dueDate){
        Report report = reportRepository.findReportByIdAndIsIteration(reportId, false);
        report.setDueDate(dueDate);


        reportRepository.save(report);

        notificationService.dueDateChangedForReportNotification(
                report.getStudent().getBilkentId(),
                report.getId(),
                report.getCourse().getCourseCode());

    }

    @Transactional
    public void setApprovalDueDate(Long reportId, LocalDate approvalDueDate){
        Report report = reportRepository.findReportByIdAndIsIteration(reportId, false);
        report.setApprovalDueDate(approvalDueDate);

        reportRepository.save(report);

        notificationService.dueDateChangedForPreviewFeedbackNotification(
                report.getTeachingAssistant().getBilkentId(), report.getStudent().getUserName()
        );
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
        feedbackRepository.deleteByReportIdAndReportIsIteration(reportId, false);
        report.setReportStats(ReportStats.ITERATION_SUBMITTED);
        reportRepository.save(report);
    }

    @Transactional
    public void addIteration(Report report, LocalDate dueDate){
        report.setIteration(true);

        Report newReport = new Report(report);
        if(dueDate == null){
            newReport.setDueDate(LocalDate.now().plusDays(14));
        }
        else{
            newReport.setDueDate(dueDate);
        }

        newReport.setPreviousIteration(report);
        newReport.setIteration(false);
        GradingForm gradingForm = report.getGradingForm();
        newReport.setGradingForm(gradingForm);
        gradingForm.setReport(newReport);

        report.setGradingForm(null);

        reportRepository.save(report);
        reportRepository.save(newReport);
    }

    public ReportStats getReportStatus(Long reportId){
        return reportRepository.getById(reportId).getReportStats();
    }

    public CompanyStats getCompanyStatus(Long reportId){
        return reportRepository.getById(reportId).getCompanyStats();
    }

    @Transactional
    public void updateStatusGradingForm(Long reportId, String formName, LocalDate dueDate){
        Report report = reportRepository.findReportByIdAndIsIteration(reportId, false);
        formName = formName.toLowerCase().strip();
        if(formName.equals("company")){
            report.setCompanyStats(CompanyStats.GRADED);
            reportRepository.save(report);
        } else if (formName.equals("iteration")) {
            report.setReportStats(ReportStats.ITERATION);
            addIteration(report, dueDate);
        } else if (formName.equals("final")) {
            report.setReportStats(ReportStats.GRADED);
            reportRepository.save(report);
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

        List<Map<ReportStats, Integer>> departmentStats = new ArrayList<>();

        try {
            course299 = courseService.getCourseByCode(department + "299");
            Map<ReportStats, Integer> courseStats299 = new HashMap<>();


            for(ReportStats reportStats: ReportStats.values()){

                courseStats299.put(reportStats, reportRepository.countAllByCourseAndReportStatsAndIsIteration(
                        course299, reportStats, false
                ));
            }
            departmentStats.add(courseStats299);

            course399 = courseService.getCourseByCode(department + "399");

            Map<ReportStats, Integer> courseStats399 = new HashMap<>();
            for(ReportStats reportStats: ReportStats.values()){
                courseStats399.put(reportStats, reportRepository.countAllByCourseAndReportStatsAndIsIteration(
                        course399, reportStats, false
                ));
            }

            departmentStats.add(courseStats399);
        }
        catch (EntityNotFoundException entityNotFoundException){
            if(departmentStats.size() == 0){
                return List.of(new HashMap<>(), new HashMap<>());
            }
            departmentStats.add(new HashMap<>());
        }


        return departmentStats;
    }

    public LocalDate getapprovalDueDate(Long reportId){
        return reportRepository.getById(reportId).getApprovalDueDate();
    }

    public ByteArrayResource downloadIteration(Long reportId){
        Report report = reportRepository.getById(reportId);
        byte[] reportPdf = report.getReportPdf();
        ByteArrayResource byteArrayResource = new ByteArrayResource(reportPdf);

        return byteArrayResource;
    }
}