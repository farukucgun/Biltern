package Caffe.BilternServer.Course;

import jakarta.persistence.*;

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

    @Column(unique = true, nullable = false)
    private String courseName;


}
