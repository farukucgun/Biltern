package Caffe.BilternServer.notification;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * This is the repository interface for the Notification object
 */

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {


    List<Notification> findAllByBilternUser(BilternUser bilternUser);

    List<Notification> findAllByDateAfterAndBilternUser(Date date, BilternUser bilternUser);

}
