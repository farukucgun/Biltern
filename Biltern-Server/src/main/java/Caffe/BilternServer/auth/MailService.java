package Caffe.BilternServer.auth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/**
 * @author jmo
 * @date 4.04.2023
 */

@Service
public class MailService {

    private final JwtService jwtService;
    private final JavaMailSender javaMailSender;


    @Autowired
    public MailService(JwtService jwtService,
                       JavaMailSender javaMailSender) {
        this.jwtService = jwtService;
        this.javaMailSender = javaMailSender;
    }



    public void sendPasswordChangeMail(String bilkentMail, Long bilkentId, String token){
        createAndSendMail("Biltern-Password Change", bilkentMail,
                " <h1> Your password change link is below <h1> \n  <a href = \""
                        + "http://127.0.0.1:5173/login/newpassword?id=" +
                        bilkentId + "&token=" + token  + "\" >  Click  </a> \n"
                );
    }


    public void sendRegisterationMail(String bilkentMail, Long bilkentId, String password) {

        createAndSendMail("Biltern Registeration", bilkentMail,
                " <h1> Your Biltern account has been created <h1> " +
                        "\nYou can use your credentials below to login: \n Bilkent ID: "+ bilkentId
                        +"\nPassword: " + password + "\n<a href = \""
                        + "http://127.0.0.1:5173/login" +
                        "\" >  Click to open Biltern  </a> \n"
        );
    }

    private void createAndSendMail(String subject, String mail, String text){
        try{

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper;
            message.setSubject(subject);

            messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom("noreply@bilternmock.com");
            messageHelper.setTo(mail);
            messageHelper.setText(text, true );

            javaMailSender.send(message);
        }
        catch (MessagingException messagingException){
            return;
        }
    };
}
