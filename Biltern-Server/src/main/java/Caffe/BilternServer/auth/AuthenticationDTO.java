package Caffe.BilternServer.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This is the DTO (Data Transfer Object) class for the authentication of users
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
