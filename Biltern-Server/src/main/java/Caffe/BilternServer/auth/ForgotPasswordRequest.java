package Caffe.BilternServer.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This is the entity class for the forgot password request from a user in case they forget it
 */


@NoArgsConstructor
@Data
public class ForgotPasswordRequest {


    @Email
    private String bilkentMail;

    @NotNull
    private Long bilkentId;

}
