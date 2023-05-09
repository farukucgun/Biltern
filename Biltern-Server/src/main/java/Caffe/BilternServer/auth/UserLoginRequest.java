package Caffe.BilternServer.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jmo
 * @date 7.05.2023
 */
@NoArgsConstructor
@Data
public class UserLoginRequest {


    @NotNull
    private Long bilkentId;

    @NotNull
    private String password;

}
