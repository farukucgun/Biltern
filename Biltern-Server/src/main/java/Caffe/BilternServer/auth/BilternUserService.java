package Caffe.BilternServer.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author jmo
 * @date 14.03.2023
 */


@Service
public class BilternUserService implements UserDetailsService {

    private final BilternUserRepo bilternUserRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public BilternUserService(
            BilternUserRepo bilternUserRepo,
            PasswordEncoder passwordEncoder) {
        this.bilternUserRepo = bilternUserRepo;
        this.passwordEncoder = passwordEncoder;
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
}
