package Caffe.BilternServer.auth;

import jakarta.validation.Valid;
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

    @PostMapping("login")
    public ResponseEntity<AuthenticationDTO> login(@Valid @RequestBody UserLoginRequest userLoginRequest){

        return ResponseEntity.ok(authService.authenticate(userLoginRequest));
    }


    @PostMapping("token")
    public ResponseEntity<String> accessToken(){

        return ResponseEntity.ok(authService.generateAccessToken());
    }


    @PostMapping("resetPassword")
    public ResponseEntity<String> changePassword(@RequestBody @Valid ForgotPasswordRequest forgotPasswordRequest){

        authService.sendResetPasswordMail(forgotPasswordRequest);

        return ResponseEntity.ok("");
    }

    @PatchMapping("changePassword")
    public ResponseEntity<String> changePassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest){


        BilternUser bilternUser = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        if(!authService.changePassword(changePasswordRequest, bilternUser)){
            return new ResponseEntity<>("User to be modified and authenticated user doesn't match.", HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok("User password has been successfully changed.");
    }











}
