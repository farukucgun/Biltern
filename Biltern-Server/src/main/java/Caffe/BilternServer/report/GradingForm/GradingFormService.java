package Caffe.BilternServer.report.GradingForm;

import Caffe.BilternServer.report.Report;
import com.itextpdf.text.DocumentException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import com.itextpdf.text.pdf.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class GradingFormService {

    GradingFormRepository gradingFormRepository;
    PDFTemplateRepository pdfTemplateRepository;

    @Autowired
    public GradingFormService(GradingFormRepository gradingFormRepository, PDFTemplateRepository pdfTemplateRepository) {
        this.gradingFormRepository = gradingFormRepository;
        this.pdfTemplateRepository = pdfTemplateRepository;
    }

    public ByteArrayResource downloadGradingForm(Long reportId) {
        byte[] pdfTemplate = pdfTemplateRepository.findById(Long.valueOf(1)).get().getTemplate();
        GradingForm gradingForm =  gradingFormRepository.findByReportId(reportId).orElse(null);
        Report report = gradingForm.getReport();
        Map<String, String> grades = gradingForm.getGrades();
        try {
            PdfReader reader = new PdfReader(pdfTemplate);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfStamper stamper = new PdfStamper(reader, outputStream);

            AcroFields formFields = stamper.getAcroFields();

            formFields.setField("name", report.getStudent().getUserName());
            formFields.setField("name1", report.getStudent().getUserName());
            formFields.setField("department", report.getStudent().getDepartment().toString());
            formFields.setField("course", (
                    report.getCourse().getCourseCode().equals("cs299") ? "choice1" : "choice2"));

            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy-MM-dd");
            String formattedDate = currentDate.format(formatter);
            formFields.setField("date", formattedDate);

            for (Map.Entry<String, String> entry : grades.entrySet()) {
                formFields.setField(entry.getKey().toLowerCase().trim(),entry.getValue());
            }
            stamper.setFormFlattening(true);
            stamper.close();
            reader.close();

            pdfTemplate = outputStream.toByteArray();

            // Use the manipulated PDF as needed (e.g., send it as a response, save it to a file, etc.)
            // ...
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
        return new ByteArrayResource(pdfTemplate);
    }

    @Transactional
    public void setGradingFormGrades(Long reportId,Map<String, String> grades){
        GradingForm gradingForm =  gradingFormRepository.findByReportId(reportId).orElse(null);
        gradingForm.setGrades(grades);
        gradingFormRepository.save(gradingForm);
    }
    public Map<String,String> getGradingFormGrades(Long reportId){
        return gradingFormRepository.findByReportId(reportId).orElse(null).getGrades();
    }


}
