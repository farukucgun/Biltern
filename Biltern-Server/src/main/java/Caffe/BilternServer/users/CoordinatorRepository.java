package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the user with type Coordinator
 */

@Repository
public interface CoordinatorRepository extends JpaRepository<Coordinator, Long> {

    Optional<Coordinator> findCoordinatorByUserName(String userName);
}
