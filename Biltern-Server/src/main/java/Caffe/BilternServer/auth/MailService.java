package Caffe.BilternServer.auth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author jmo
 * @date 4.04.2023
 */

@Service
public class MailService {


    private final BilternUserService bilternUserService;
    private final JwtService jwtService;
    private final JavaMailSender javaMailSender;


    @Autowired
    public MailService(BilternUserService bilternUserService,
                       JwtService jwtService,
                       JavaMailSender javaMailSender) {
        this.bilternUserService = bilternUserService;
        this.jwtService = jwtService;
        this.javaMailSender = javaMailSender;
    }



    public void sendPasswordChangeMail(String email, Long bilkentId, String token){

        try{

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper;
            message.setSubject("Biltern-Password Change");

            messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom("noreply@bilternmock.com");
            messageHelper.setTo(email);
            messageHelper.setText(" <h1> Your password change link is below <h1> \n  <a href = \"" + "http://localhost:5173?id=" + bilkentId + "&token=" + token  + "\" >  Click  </a> \n"  , true );

            javaMailSender.send(message);
        }
        catch (MessagingException messagingException){
            return;
        }
    }






}
