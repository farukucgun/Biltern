package Caffe.BilternServer.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This is the entity class for the UserLoginRequest object
 */
@NoArgsConstructor
@Data
public class UserLoginRequest {


    @NotNull
    private Long bilkentId;

    @NotNull
    private String password;

}
