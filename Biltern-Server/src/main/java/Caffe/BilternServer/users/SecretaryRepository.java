package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the user with type Secretary
 */

@Repository
public interface SecretaryRepository extends JpaRepository<Secretary, Long> {

    Optional<Secretary> findSecretaryByUserName(String userName);
}
