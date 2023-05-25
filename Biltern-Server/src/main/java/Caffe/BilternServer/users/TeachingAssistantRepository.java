package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeachingAssistantRepository extends JpaRepository<TeachingAssistant, Long> {

    Optional<TeachingAssistant> findTeachingAssistantByUserName(String userName);
}
