package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import Caffe.BilternServer.course.Course;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.List;

/**
 * This is the entity class for the user with type Secretary
 */

@Data
@Entity
public class Secretary extends BilternUser {

    private Department department;

    @OneToMany(mappedBy = "secretary", fetch = FetchType.LAZY)
    @Cascade(CascadeType.ALL)
    @JsonIgnore
    private List<Course> courses;


}
