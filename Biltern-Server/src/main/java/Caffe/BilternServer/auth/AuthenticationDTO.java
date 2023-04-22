package Caffe.BilternServer.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jmo
 * @date date
 */

@NoArgsConstructor
@Data
public class AuthenticationDTO {

    private String jwt;
    private BilternUserRole role;


}
