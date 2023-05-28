package Caffe.BilternServer.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author jmo
 * @date 4.04.2023
 */


@Service
public class AuthService {

    private final BilternUserService bilternUserService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final MailService mailService;

    @Autowired
    public AuthService(BilternUserService bilternUserService, AuthenticationManager authenticationManager, JwtService jwtService, MailService mailService) {
        this.bilternUserService = bilternUserService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }

    public AuthenticationDTO authenticate(UserLoginRequest userLoginRequest){

        BilternUser bilternUser = bilternUserService.loadUserById(userLoginRequest.getBilkentId());

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                bilternUser.getUserName(), userLoginRequest.getPassword()
        ));



        AuthenticationDTO authenticationDTO = new AuthenticationDTO();

        authenticationDTO.setRole(bilternUser.getBilternUserRole());
        authenticationDTO.setJwt(jwtService.generateRefreshToken(bilternUser, new HashMap<>()));
        authenticationDTO.setEmail(bilternUser.getBilkentMail());
        authenticationDTO.setFullName(bilternUser.getUsername());
        authenticationDTO.setBilkentId(bilternUser.getBilkentId());

        return authenticationDTO;
    }


    public String generateAccessToken(){

        BilternUser bilternUser = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        return jwtService.generateAccessToken(bilternUser, new HashMap<>());
    }


    public boolean changePassword(ChangePasswordRequest changePasswordRequest, BilternUser bilternUser) {

        if(changePasswordRequest.getBilternID().longValue() != bilternUser.getBilkentId()){
            return false;
        }

        bilternUserService.changePasswordOfUser(bilternUser, changePasswordRequest.getPassword());
        return true;
    }

    public void sendResetPasswordMail(ForgotPasswordRequest forgotPasswordRequest) {

        BilternUser bilternUser = bilternUserService.loadUserById(forgotPasswordRequest.getBilkentId());

        if(bilternUser == null || !forgotPasswordRequest.getBilkentMail().equals(bilternUser.getBilkentMail())){
            return;
        }

        String token = jwtService.generateOnceUseToken(bilternUser, new HashMap<>() );

        mailService.sendPasswordChangeMail(bilternUser.getBilkentMail(), bilternUser.getBilkentId(), token);
    }
}
