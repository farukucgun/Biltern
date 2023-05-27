package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.io.File;
import java.util.List;

@Entity
public class Grader extends BilternUser {

    @Column
    private Long reportCount;

    @Column
    private File signature;

    @OneToMany
    @JsonIgnore
    private List<Report> report;

    public Long getReportCount() {
        return reportCount;
    }

    public void setReportCount(Long reportCount) {
        this.reportCount = reportCount;
    }

    public File getSignature() {
        return signature;
    }

    public void setSignature(File signature) {
        this.signature = signature;
    }

    public List<Report> getReport() {
        return report;
    }

    public void setReport(List<Report> report) {
        this.report = report;
    }
}
