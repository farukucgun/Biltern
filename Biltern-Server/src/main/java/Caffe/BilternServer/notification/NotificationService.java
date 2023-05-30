package Caffe.BilternServer.notification;

import Caffe.BilternServer.auth.BilternUser;
import Caffe.BilternServer.auth.BilternUserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * This is the service class for the Notification object
 */

@Service
public class NotificationService {

    private final NotificationRepo notificationRepo;
    private final BilternUserService bilternUserService;

    @Autowired
    public NotificationService(
            NotificationRepo notificationRepo,
            BilternUserService bilternUserService) {
        this.notificationRepo = notificationRepo;
        this.bilternUserService = bilternUserService;
    }

    private BilternUser getUser(Long bilkentId){


        return bilternUserService.loadUserById(bilkentId);
    }

    public void createPreviewFeedbackGivenNotification(
            Long studentId,
            Long reportId,
            String courseCode){

        Notification notification = new Notification();

        notification.setBody("Preview feedback given to your " + courseCode + " course report");
        notification.setType("Preview feedback given");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }

    public void createFeedbackGivenNotification(
            Long studentId,
            Long reportId,
            String courseCode){

        Notification notification = new Notification();

        notification.setBody("Feedback given to your " + courseCode + " course report");
        notification.setType("Feedback given");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }

    public void dueDateChangedForReportNotification(
            Long studentId,
            Long reportId,
            String courseCode){
        Notification notification = new Notification();


        notification.setBody("Due date has changed for your " + courseCode + " course report");
        notification.setType("Report due date changed");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }

    public void dueDateChangedForPreviewFeedbackNotification(
            Long taId,
            String studentName){
        Notification notification = new Notification();

        notification.setBody("Preview due date has changed for report of student " + studentName + "'s course report");
        notification.setType("Preview due date changed");
        notification.setBilternUser(getUser(taId));
        notificationRepo.save(notification);
    }

    public void createTAChangedNotification(
            Long studentId,
            Long reportId,
            String courseCode){
        Notification notification = new Notification();

        notification.setBody("TA of course " + courseCode + " has changed");
        notification.setType("TA changed");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }

    public void createGraderChangedNotification(
            Long studentId,
            Long reportId,
            String courseCode){
        Notification notification = new Notification();

        notification.setBody("Grader of course " + courseCode + " has changed");
        notification.setType("Grader changed");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }

    public void createCompanyContactRequestNotification(
            Long studentId,
            Long reportId,
            String courseCode){
        Notification notification = new Notification();

        notification.setBody("Grader requested company contact information for your " + courseCode + " course report ");
        notification.setType("Company contact requested");
        notification.setBilternUser(getUser(studentId));
        notification.setReportId(reportId);
        notificationRepo.save(notification);
    }


    public List<Notification> getUserNotifications() {
        BilternUser bilternUser =
                (BilternUser) SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();

        return notificationRepo.findAllByBilternUser(bilternUser);
    }


    public List<Notification> getAllAfterDate(Date date){

        BilternUser bilternUser =
                (BilternUser) SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();
        return notificationRepo.findAllByDateAfterAndBilternUser(date, bilternUser);
    }

    public void setNotificationSeen(Long notificationId) {
        Notification notification =
                notificationRepo
                .findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException());
        notification.setSeen(true);
        notificationRepo.save(notification);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepo.deleteById(notificationId);
    }
}
