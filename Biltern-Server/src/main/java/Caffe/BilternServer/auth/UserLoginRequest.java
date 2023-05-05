package Caffe.BilternServer.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

/**
 * @author jmo
 * @date date
 */
@NoArgsConstructor
@Data
public class UserLoginRequest {


    private Long bilkentId;
    private String password;

}
