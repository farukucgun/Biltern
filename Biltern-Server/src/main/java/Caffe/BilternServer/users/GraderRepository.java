package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the user with type Grader
 */
@Repository
public interface GraderRepository extends JpaRepository<Grader, Long> {

    Optional<Grader> findGraderByUserName(String userName);
}
