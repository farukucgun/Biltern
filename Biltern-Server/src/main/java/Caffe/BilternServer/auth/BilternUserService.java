package Caffe.BilternServer.auth;

import Caffe.BilternServer.roleadministration.UserRegisterationRequest;
import Caffe.BilternServer.users.Coordinator;
import Caffe.BilternServer.users.Secretary;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;
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
                "Can't find user with Bilkent ID: " + bilkentId
        ));
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return bilternUserRepo.findBilternUserByUserName(username).orElseThrow(
                () -> new UsernameNotFoundException(
                        "Can't find user with username: " + username
        ));
    }


    public void changePasswordOfUser(BilternUser bilternUser, String password) {
        bilternUser.setPassword(passwordEncoder.encode(password));

        bilternUserRepo.save(bilternUser);
    }

    public boolean registerUser(UserRegisterationRequest userRegisterationRequest) throws InstanceAlreadyExistsException {

        if(bilternUserRepo.findById(userRegisterationRequest.getBilkentId()).orElse(null) != null
                || bilternUserRepo.findBilternUserByBilkentMail(userRegisterationRequest.getEmail()) != null){
            throw new InstanceAlreadyExistsException();
        }

        BilternUser userToBeRegistered;

        if(userRegisterationRequest.getBilternUserRole() == BilternUserRole.SECRETARY){
            userToBeRegistered = new Secretary();
            ((Secretary)userToBeRegistered).setDepartment(userRegisterationRequest.getDepartment());
        }
        else if(userRegisterationRequest.getBilternUserRole() == BilternUserRole.DEPARTMENT_COORDINATOR){
            userToBeRegistered = new Coordinator();
            ((Coordinator)userToBeRegistered).setDepartment(userRegisterationRequest.getDepartment());
            ((Coordinator)userToBeRegistered).setDean(userRegisterationRequest.isDean());
        }
        else {
            userToBeRegistered = new BilternUser();
        }

        userToBeRegistered.setBilternUserRole(userRegisterationRequest.getBilternUserRole());
        userToBeRegistered.setUserName(userRegisterationRequest.getUserName());
        userToBeRegistered.setBilkentMail(userRegisterationRequest.getEmail());
        userToBeRegistered.setBilkentId(userRegisterationRequest.getBilkentId());

        String randomPassword = bilternPasswordGenerator.generateRandomPassword();
        userToBeRegistered.setPassword(passwordEncoder.encode(randomPassword));
        bilternUserRepo.save(userToBeRegistered);
        mailService.sendRegisterationMail(userToBeRegistered.getBilkentMail(),
                userToBeRegistered.getBilkentId(), randomPassword);
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
