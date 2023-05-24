package Caffe.BilternServer.report.Feedback;

import Caffe.BilternServer.report.Report;
import jakarta.persistence.*;

@Entity(name = "Feedback")
@Table(name = "Feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false,
            updatable = false
    )
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] pdfData;

    private boolean isPrev;

    @OneToOne
    @JoinColumn(name = "reportId", referencedColumnName = "id")
    private Report report;



    public Feedback(Report report){
        this.report = report;
    }
    public Feedback(){
    }
    public byte[] getPdfData() {
        return pdfData;
    }

    public void setPdfData(byte[] pdfData) {
        this.pdfData = pdfData;
    }

    public boolean isPrev() {
        return isPrev;
    }

    public void setPrev(boolean prev) {
        isPrev = prev;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }
}