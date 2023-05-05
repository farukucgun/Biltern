package Caffe.BilternServer.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author jmo
 * @date date
 */

@Repository
public interface BilternUserRepo extends JpaRepository<BilternUser, Long> {


    Optional<BilternUser> findBilternUserByUserName(String username);


}
