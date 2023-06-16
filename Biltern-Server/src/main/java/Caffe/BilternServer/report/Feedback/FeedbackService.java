package Caffe.BilternServer.report.Feedback;

import Caffe.BilternServer.notification.NotificationService;
import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.report.ReportRepository;
import Caffe.BilternServer.report.ReportStats;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

/**
 * This is the service class for the Feedback object
 */

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    private final NotificationService notificationService;
    private final ReportRepository reportRepository;
    @Autowired
    public FeedbackService(
            FeedbackRepository feedBackRepository,
            NotificationService notificationService,
            ReportRepository reportRepository) {
        this.feedbackRepository = feedBackRepository;
        this.notificationService = notificationService;
        this.reportRepository = reportRepository;
    }

    @Transactional
    public void saveReportFeedback(Long reportId, byte[] feedbackPDF){
        Feedback feedback = feedbackRepository.findByReportIdAndIsPrev(reportId, false).get();

        Report report = reportRepository.findById(reportId).orElse(null);

        if(feedback == null){
            feedback = new Feedback();
            feedback.setReport(report);
        }

        feedback.setPdfData(feedbackPDF);
        feedback.setPrev(false);
        feedbackRepository.save(feedback);

        notificationService.createFeedbackGivenNotification(
                report.getStudent().getBilkentId(), reportId, report.getCourse().getCourseCode()
        );
    }
    public ByteArrayResource downloadReportFeedback(Long reportId){
        Feedback feedback = feedbackRepository.findByReportIdAndIsPrev(reportId, false).get();
        byte[] feedbackPDF = feedback.getPdfData();
        ByteArrayResource byteArrayResource = new ByteArrayResource(feedbackPDF);

        return byteArrayResource;
    }
    @Transactional
    public void saveReportPreviewFeedback(Long reportId, byte[] feedbackPDF){
        Feedback feedback = feedbackRepository.findByReportIdAndIsPrev(reportId, true).get();

        Report report = reportRepository.findById(reportId).orElse(null);
        report.setReportStats(ReportStats.APPROVED);
        if(feedback == null){
            feedback = new Feedback();

            feedback.setReport(report);
        }

        feedback.setPdfData(feedbackPDF);
        feedback.setPrev(true);
        feedbackRepository.save(feedback);

        notificationService.createPreviewFeedbackGivenNotification(
                report.getStudent().getBilkentId(), report.getId(), report.getCourse().getCourseCode()
        );
    }
    @Transactional
    public void removeFeedback(Long reportId){
        feedbackRepository.delete(feedbackRepository.findByReportIdAndIsPrev(reportId, false).get());
    }

    @Transactional
    public void removePreviewFeedback(Long reportId){
        feedbackRepository.delete(feedbackRepository.findByReportIdAndIsPrev(reportId, true).get());
    }

}

