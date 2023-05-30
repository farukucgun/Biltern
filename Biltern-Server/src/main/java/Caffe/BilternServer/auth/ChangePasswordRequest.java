package Caffe.BilternServer.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

/**
 * This is the entity class for the change password request from a user in case they wish to change it
 */

@Data
public class ChangePasswordRequest {

    @NotNull
    private Long bilternID;

    @NotNull
    private String password;

}
