package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

/**
 * This is the entity class for the user with type Coordinator
 */

@Data
@Entity
public class Coordinator extends BilternUser {

    @Column
    private boolean isDean;

    private Department department;
}
