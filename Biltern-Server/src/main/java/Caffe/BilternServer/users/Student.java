package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Student extends BilternUser {

    @Column
    private String department;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
