package Caffe.BilternServer.report.Feedback;

import Caffe.BilternServer.report.Report;
import jakarta.persistence.*;
import lombok.Data;

/**
 * This is the entity class for the Feedback object
 */
@Data
@Entity(name = "Feedback")
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
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "LONGBLOB")
    private byte[] pdfData;

    private boolean isPrev;

    @ManyToOne
    @JoinColumn(name = "reportId", referencedColumnName = "id")
    private Report report;

    public Feedback(){

    }
    public Feedback(Report report, boolean isPrev){
        this.report = report;
        this.isPrev = isPrev;
    }
}

