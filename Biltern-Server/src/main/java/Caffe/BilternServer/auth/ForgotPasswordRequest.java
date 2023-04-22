package Caffe.BilternServer.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jmo
 * @date date
 */


@NoArgsConstructor
@Data
public class ForgotPasswordRequest {

    private String bilkentMail;
    private Long bilkentId;

}
