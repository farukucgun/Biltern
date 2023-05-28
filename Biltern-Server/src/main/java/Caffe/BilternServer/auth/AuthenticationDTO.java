package Caffe.BilternServer.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jmo
 * @date 8.05.2023
 */

@NoArgsConstructor
@Data
public class AuthenticationDTO {

    private String jwt;
    private BilternUserRole role;
    private String fullName;
    private String email;

    private Long bilkentId;
}
