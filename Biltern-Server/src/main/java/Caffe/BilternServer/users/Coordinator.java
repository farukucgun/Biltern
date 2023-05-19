package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Coordinator extends BilternUser {

    @Column
    private boolean isDean;

    public boolean isDean() {
        return isDean;
    }

    public void setDean(boolean dean) {
        isDean = dean;
    }
}
