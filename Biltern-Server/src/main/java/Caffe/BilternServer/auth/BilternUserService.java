package Caffe.BilternServer.auth;

import Caffe.BilternServer.roleadministration.UserRegisterationRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author jmo
 * @date 14.03.2023
 */


@Service
public class BilternUserService implements UserDetailsService {

    private final BilternUserRepo bilternUserRepo;
    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    private final BilternPasswordGenerator bilternPasswordGenerator;

    @Autowired
    public BilternUserService(
            BilternUserRepo bilternUserRepo,
            PasswordEncoder passwordEncoder,
            MailService mailService,
            BilternPasswordGenerator bilternPasswordGenerator) {
        this.bilternUserRepo = bilternUserRepo;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.bilternPasswordGenerator = bilternPasswordGenerator;
    }

    public BilternUser loadUserById(Long bilkentId) throws UsernameNotFoundException {
        return bilternUserRepo.findById(bilkentId).orElseThrow(() -> new UsernameNotFoundException(
                "Can't user with Bilkent ID: " + bilkentId
        ));
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return bilternUserRepo.findBilternUserByUserName(username).orElseThrow(
                () -> new UsernameNotFoundException(
                        "Can't user with username: " + username
        ));
    }


    public void changePasswordOfUser(BilternUser bilternUser, String password) {
        bilternUser.setPassword(passwordEncoder.encode(password));

        bilternUserRepo.save(bilternUser);
    }

    public boolean registerUser(UserRegisterationRequest userRegisterationRequest){
        if(bilternUserRepo.findById(userRegisterationRequest.getBilkentId()).orElse(null) != null
                || bilternUserRepo.findBilternUserByBilkentMail(userRegisterationRequest.getEmail()) != null){
            return false;
        }

        BilternUser bilternUser = new BilternUser();
        bilternUser.setBilternUserRole(userRegisterationRequest.getBilternUserRole());
        bilternUser.setUserName(userRegisterationRequest.getUserName());
        bilternUser.setBilkentMail(userRegisterationRequest.getEmail());
        bilternUser.setBilkentId(userRegisterationRequest.getBilkentId());

        String randomPassword = bilternPasswordGenerator.generateRandomPassword();
        bilternUser.setPassword(passwordEncoder.encode(randomPassword));
        bilternUserRepo.save(bilternUser);
        mailService.sendRegisterationMail(bilternUser.getBilkentMail(), bilternUser.getBilkentId(), randomPassword);
        return true;
    }

    public void assignUsersToRole(
            List<Long> userIdList,
            BilternUserRole bilternUserRole) {

        List<BilternUser> list = new ArrayList<>();
        for(Long id: userIdList){
            BilternUser bilternUser = bilternUserRepo.findById(id).orElseThrow(() -> new EntityNotFoundException());
            bilternUser.setBilternUserRole(bilternUserRole);

            list.add(bilternUser);
        }

        bilternUserRepo.saveAll(list);
    }
}
