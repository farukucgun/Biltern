package Caffe.BilternServer.users;

import lombok.Data;

import java.util.Map;

/**
 * @author jmo
 * @date 28.05.2023
 */

@Data
public class SecretaryDTO {


    private Department department;
    private Map<String, Long> courseMap;


}
