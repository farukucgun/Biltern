package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecretaryRepository extends JpaRepository<Secretary, Long> {

    Optional<Secretary> findSecretaryByUserName(String userName);
}
