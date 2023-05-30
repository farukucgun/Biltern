package Caffe.BilternServer.users;

import lombok.Data;

import java.util.Map;

/**
 * This is the DTO (Data Transfer Object) class for the user with type Secretary
 */

@Data
public class SecretaryDTO {


    private Department department;
    private Map<String, Long> courseMap;


}
