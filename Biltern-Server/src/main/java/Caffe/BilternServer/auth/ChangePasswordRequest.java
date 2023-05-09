package Caffe.BilternServer.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

/**
 * @author jmo
 * @date 19.04.2023
 */

@Data
public class ChangePasswordRequest {

    @NotNull
    private Long bilternID;

    @NotNull
    private String password;

}
