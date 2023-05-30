package Caffe.BilternServer.notification;

import Caffe.BilternServer.auth.BilternUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

/**
 * This is the entity class for the Notification object
 */

@Table(name = "biltern_notification")
@Entity
@Data
public class Notification {


    @GeneratedValue
    @Id
    private Long notificationId;

    @CreationTimestamp
    private Date date;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bilkent_id")
    private BilternUser bilternUser;

    private String type;

    private String body;

    private Long reportId;
    private boolean seen;

}
