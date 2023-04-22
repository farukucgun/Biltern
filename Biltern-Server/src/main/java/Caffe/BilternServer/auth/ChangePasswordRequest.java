package Caffe.BilternServer.auth;

/**
 * @author jmo
 * @date 19.04.2023
 */
public class ChangePasswordRequest {



    private Long bilternID;

    private String password;


    public Long getBilternID() {
        return bilternID;
    }

    public void setBilternID(Long bilternID) {
        this.bilternID = bilternID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
