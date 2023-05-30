package Caffe.BilternServer.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the BilternUser object
 */
@Repository
public interface BilternUserRepo extends JpaRepository<BilternUser, Long> {


    Optional<BilternUser> findBilternUserByUserName(String username);

    BilternUser findBilternUserByBilkentMail(String mail);

}
