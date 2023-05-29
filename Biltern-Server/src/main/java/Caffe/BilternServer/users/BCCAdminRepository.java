package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This is the repository interface for the user with type BCCAdmin
 */
@Repository
public interface BCCAdminRepository extends JpaRepository<BCCAdmin, Long> {

}
