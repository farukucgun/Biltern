package Caffe.BilternServer.report;

import Caffe.BilternServer.report.Feedback.FeedbackService;
import Caffe.BilternServer.report.GradingForm.GradingFormService;
import Caffe.BilternServer.users.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * This is the controller class for report objects, including functionalities to upload/download/delete reports, set and get due dates,
 * download/upload feedback, adding iterations, and getting users associated with the report
 */
@RestController
@CrossOrigin(origins = "${client.domain}")
@RequestMapping("report")
public class ReportController {
    private final ReportService reportService;
    private final FeedbackService feedbackService;
    private final GradingFormService gradingFormService;
    @Autowired
    public ReportController(ReportService reportService, FeedbackService feedbackService, GradingFormService gradingFormService) {
        this.reportService = reportService;
        this.feedbackService = feedbackService;
        this.gradingFormService = gradingFormService;
    }


    @PutMapping("/dueDate/{reportId}")
    public void changeReportDueDate(@PathVariable Long reportId, @RequestBody Map<String, Object> requestBody){
        LocalDate dueDate = LocalDate.parse((String) requestBody.get("dueDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        reportService.setDueDate(reportId, dueDate);
    }

    @GetMapping("/dueDate/{reportId}")
    public ResponseEntity<LocalDate> getDueDate(@PathVariable Long reportId){
        return ResponseEntity.ok(reportService.getDueDate(reportId));
    }

    @PutMapping("/approvalDueDate/{reportId}")
    public void changeReportApprovalDueDate(@PathVariable Long reportId, @RequestBody Map<String, Object> requestBody){
        LocalDate approvalDueDate = LocalDate.parse((String) requestBody.get("approvalDueDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        reportService.setApprovalDueDate(reportId, approvalDueDate);
    }

    @GetMapping("/approvalDueDate/{reportId}")
    public ResponseEntity<LocalDate> getApprovalDueDate(@PathVariable Long reportId){
        return ResponseEntity.ok(reportService.getapprovalDueDate(reportId));
    }
    @PutMapping("/reportContent/{reportId}")
    public void uploadReport(@PathVariable Long reportId, @RequestBody MultipartFile file){
        if (!file.isEmpty()) {
            try {
                byte[] reportContent = file.getBytes();

                reportService.uploadReportPDF(reportId,reportContent);

            } catch (IOException e) {
                e.printStackTrace();
                // Handle the exception
            }
        }
    }
    @GetMapping("/reportContent/{reportId}")
    public ResponseEntity<ByteArrayResource> downloadReport(@PathVariable Long reportId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(reportService.downloadReport(reportId));
    }

    @DeleteMapping("/reportContent/{reportId}")
    public void deleteReportPDF(@PathVariable Long reportId){
        reportService.deleteReportPDF(reportId);
    }


    @PutMapping("/feedback/{reportId}")
    public void saveReportFeedback(@PathVariable Long reportId,@RequestBody MultipartFile file) {
        try {
            feedbackService.saveReportFeedback(reportId, file.getBytes());
            reportService.addIteration(reportId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/feedback/{reportId}")
    public ResponseEntity<ByteArrayResource> downloadReportFeedback(@PathVariable Long reportId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(feedbackService.downloadReportFeedback(reportId));
    }

    @PutMapping("/previewFeedback/{reportId}")
    public void savePreviewReportFeedback(@PathVariable Long reportId,@RequestBody MultipartFile file) {
        try {
            feedbackService.saveReportPreviewFeedback(reportId, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/previewFeedback/{reportId}")
    public ResponseEntity<ByteArrayResource> downloadReportPreviewFeedback(@PathVariable Long reportId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(feedbackService.downloadReportFeedback(reportId));
    }

    @GetMapping("/reportStatus/{reportId}")
    public ResponseEntity<List<String>> getReportStatus(@PathVariable Long reportId){
        return ResponseEntity.ok(Arrays.stream(reportService.getReportStatus(reportId).getStatusArray()).toList());
    }

    @GetMapping("/companyStatus/{reportId}")
    public ResponseEntity<CompanyStats> getCompanyStatus(@PathVariable Long reportId){
        return ResponseEntity.ok(reportService.getCompanyStatus(reportId));
    }

    @PutMapping("/gradingForm/{reportId}")
    public void submitGrades(@PathVariable Long reportId, @RequestBody Map<String, String> grades){
        String formName = grades.get("formName");
        grades.remove("formName");
        reportService.updateStatusGradingForm(reportId, formName);
        gradingFormService.setGradingFormGrades(reportId,grades);
    }
    @GetMapping("/gradingForm/{reportId}")
    public ResponseEntity<ByteArrayResource> downloadGradingForm(@PathVariable Long reportId){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(gradingFormService.downloadGradingForm(reportId));
    }

    @GetMapping("/grades/{reportId}")
    public ResponseEntity<Map> getGrading(@PathVariable Long reportId){
        return ResponseEntity.ok(gradingFormService.getGradingFormGrades(reportId));
    }
    @GetMapping("/grader/{reportId}")
    public ResponseEntity<Grader> getReportGrader(@PathVariable Long reportId){
        return ResponseEntity.ok(reportService.getReportGrader(reportId));
    }

    @GetMapping("/TA/{reportId}")
    public ResponseEntity<TeachingAssistant> getReportTA(@PathVariable Long reportId){
        return ResponseEntity.ok(reportService.getReportTA(reportId));
    }

//    @PostMapping
//    public void addReport(){
//        reportService.addNewReport();
//    }

    @GetMapping("/iterations/{reportId}")
    public ResponseEntity<ByteArrayResource> getspecificIteration(@PathVariable Long reportId){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "pdf_file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(reportService.downloadIteration(reportId));
    }

}

