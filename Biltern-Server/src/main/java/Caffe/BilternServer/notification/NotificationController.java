package Caffe.BilternServer.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author jmo
 * @date 9.05.2023
 */


@RestController
@RequestMapping("notification")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PutMapping("{notificationId}")
    public void setSeenToTrue(@PathVariable Long notificationId){

        notificationService.setNotificationSeen(notificationId);
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(){

        return ResponseEntity.ok(notificationService.getUserNotifications());
    }

    @GetMapping("recent/{date}")
    public ResponseEntity<List<Notification>> getRecentNotifications(@PathVariable Date date){

        return ResponseEntity.ok(notificationService.getAllAfterDate(date));
    }

    @DeleteMapping("{notificationId}")
    public void deleteNotification(@PathVariable Long notificationId){
        notificationService.deleteNotification(notificationId);
    }


}
