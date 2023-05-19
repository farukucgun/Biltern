package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class TeachingAssistant extends BilternUser {

    @Column
    private Long reportCount;

    public Long getReportCount() {
        return reportCount;
    }

    public void setReportCount(Long reportCount) {
        this.reportCount = reportCount;
    }
}
