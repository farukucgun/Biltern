package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the user with type TeachingAssistant
 */

@Repository
public interface TeachingAssistantRepository extends JpaRepository<TeachingAssistant, Long> {

    Optional<TeachingAssistant> findTeachingAssistantByUserName(String userName);
}
