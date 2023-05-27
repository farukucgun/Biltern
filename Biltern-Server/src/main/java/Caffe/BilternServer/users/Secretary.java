package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.Entity;
import lombok.Data;


@Data
@Entity
public class Secretary extends BilternUser {

    private Department department;
}
