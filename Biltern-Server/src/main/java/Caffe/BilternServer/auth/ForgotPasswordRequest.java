package Caffe.BilternServer.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jmo
 * @date 8.05.2023
 */


@NoArgsConstructor
@Data
public class ForgotPasswordRequest {


    @Email
    private String bilkentMail;

    @NotNull
    private Long bilkentId;

}
