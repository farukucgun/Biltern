package Caffe.BilternServer.course;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.users.Secretary;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;


@Data
@Entity(name = "Course")
@Table(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "id",
            nullable = false,
            updatable = false
    )
    private Long id;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "secretaryId")
    private Secretary secretary;

    @Column(unique = true, nullable = false)
    private String courseCode;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Report> reports;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
