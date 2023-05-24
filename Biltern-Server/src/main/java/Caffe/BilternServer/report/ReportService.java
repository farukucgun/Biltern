package Caffe.BilternServer.report;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;



@Service
public class ReportService {
    private final ReportRepository reportRepository;
    @Autowired
    public ReportService(
            ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Transactional
    public void addReport(){

    }
    @Transactional
    public void updateReportStat() {

    }

    @Transactional
    public void addNewReport(Report report){
        reportRepository.save(report);
    }


    @Transactional
    public void uploadReportPDF(byte[] reportContent){
        Report report = new Report();
        report.setReportPdf(reportContent);
        reportRepository.save(report);
    }

    public ByteArrayResource downloadReport(Long reportId){
        Report report = reportRepository.getById(reportId);
        byte[] reportPdf = report.getReportPdf();
        ByteArrayResource byteArrayResource = new ByteArrayResource(reportPdf);

        return byteArrayResource;
    }

    @Transactional
    public void deleteReportPDF(){

    }
    public void updateStatus(){
    }

}