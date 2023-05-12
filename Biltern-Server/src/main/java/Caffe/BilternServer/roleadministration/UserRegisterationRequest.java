package Caffe.BilternServer.roleadministration;

import Caffe.BilternServer.auth.BilternUserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author jmo
 * @date 9.05.2023
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

}
