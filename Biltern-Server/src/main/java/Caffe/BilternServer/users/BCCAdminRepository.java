package Caffe.BilternServer.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BCCAdminRepository extends JpaRepository<BCCAdmin, Long> {

}
