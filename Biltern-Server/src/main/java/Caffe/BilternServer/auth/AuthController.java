package Caffe.BilternServer.auth;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * This is the controller class for the authentication of users, including a functionality to login, get token, and change password
 */



@CrossOrigin(origins = "${client.domain}")
@RequestMapping("auth")
@RestController
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
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
