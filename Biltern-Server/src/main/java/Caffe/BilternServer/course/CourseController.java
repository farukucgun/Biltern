package Caffe.BilternServer.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This is the controller class for the Course object, including functionalities to add and get courses
 */
@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("course")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getCourses() { return courseService.getCourse(); }

    @PostMapping
    public void addCourse(@RequestBody Course course) { courseService.addCourse(course); }
}
