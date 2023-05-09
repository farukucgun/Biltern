package Caffe.BilternServer.notification;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * @author jmo
 * @date 8.05.2023
 */

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {


    List<Notification> findAllByBilternUser(BilternUser bilternUser);

    List<Notification> findAllByDateAfterAndBilternUser(Date date, BilternUser bilternUser);

}
