package Caffe.BilternServer.roleadministration;

import Caffe.BilternServer.auth.BilternUserRole;
import Caffe.BilternServer.users.Department;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * This is the entity class for the user registration request object
 */

@Data
public class UserRegisterationRequest {

    @NotBlank
    private String userName;

    @NotNull
    private Long bilkentId;
    @Email
    private String email;
    @NotNull
    private BilternUserRole bilternUserRole;


    @NotNull
    private Department department;


    private boolean isDean;

}
