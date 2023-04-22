package Caffe.BilternServer.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * @author jmo
 * @date 17.03.2023
 */



@CrossOrigin(origins = "${client.domain}")
@RequestMapping("auth")
@RestController
public class AuthController {

    private final MailService mailService;
    private final BilternUserService bilternUserService;
    private final AuthService authService;

    @Autowired
    public AuthController(MailService mailService, BilternUserService bilternUserService, AuthService authService) {
        this.mailService = mailService;
        this.bilternUserService = bilternUserService;
        this.authService = authService;
    }

    @GetMapping("login")
    public ResponseEntity<AuthenticationDTO> login(@RequestBody UserLoginRequest userLoginRequest){

        if(userLoginRequest.getPassword() == null || userLoginRequest.getBilkentId() == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(authService.authenticate(userLoginRequest));
    }

    @GetMapping("token")
    public ResponseEntity<String> accessToken(){

        return ResponseEntity.ok(authService.generateAccessToken());
    }


    @GetMapping("resetPassword")
    public ResponseEntity<String> changePassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){

        if(forgotPasswordRequest.getBilkentId() == null || forgotPasswordRequest.getBilkentMail() == null){
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }


        authService.sendResetPasswordMail(forgotPasswordRequest);

        return ResponseEntity.ok("");
    }

    @PatchMapping("changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest){


        BilternUser bilternUser = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        if(changePasswordRequest.getBilternID() == null || changePasswordRequest.getPassword() == null){
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }



        if(!authService.changePassword(changePasswordRequest, bilternUser)){
            return new ResponseEntity<>("User to be modified and authenticated user doesn't match.", HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok("User password has been successfully changed.");
    }











}
