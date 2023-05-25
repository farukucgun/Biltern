package Caffe.BilternServer.Report.Feedback;

import Caffe.BilternServer.Report.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;


@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final ReportRepository reportRepository;
    @Autowired
    public FeedbackService(
            FeedbackRepository feedBackRepository, ReportRepository reportRepository) {
        this.feedbackRepository = feedBackRepository;
        this.reportRepository = reportRepository;
    }

    @Transactional
    public void saveReportFeedback(Long reportId, byte[] feedbackPDF){
        Feedback feedback = feedbackRepository.findByReportIdAndAndIsPrev(reportId, false).get();
        if(feedback == null){
            feedback = new Feedback();
            feedback.setReport(reportRepository.findById(reportId).orElse(null));
        }

        feedback.setPdfData(feedbackPDF);
        feedback.setPrev(false);
        feedbackRepository.save(feedback);
    }
    public ByteArrayResource downloadReportFeedback(Long reportId){
        Feedback feedback = feedbackRepository.findByReportIdAndAndIsPrev(reportId, false).get();
        byte[] feedbackPDF = feedback.getPdfData();
        ByteArrayResource byteArrayResource = new ByteArrayResource(feedbackPDF);

        return byteArrayResource;
    }
    @Transactional
    public void saveReportPreviewFeedback(Long reportId, byte[] feedbackPDF){
        Feedback feedback = feedbackRepository.findByReportIdAndAndIsPrev(reportId, true).get();
        if(feedback == null){
            feedback = new Feedback();
            feedback.setReport(reportRepository.findById(reportId).orElse(null));
        }

        feedback.setPdfData(feedbackPDF);
        feedback.setPrev(true);
        feedbackRepository.save(feedback);
    }
    @Transactional
    public void removeFeedback(Long reportId){
        feedbackRepository.delete(feedbackRepository.findByReportIdAndAndIsPrev(reportId, false).get());
    }

    @Transactional
    public void removePreviewFeedback(Long reportId){
        feedbackRepository.delete(feedbackRepository.findByReportIdAndAndIsPrev(reportId, true).get());
    }

}

