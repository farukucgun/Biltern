package Caffe.BilternServer.course;
import Caffe.BilternServer.report.Report;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getCourse() { return courseRepository.findAll(); }

    public void addCourse(Course course) {
        if (courseRepository.existsById(course.getId())) {
            throw new IllegalStateException("A course with that code already exists.");
        }
        courseRepository.save(course);
    }

    public void addReport(Long courseId, Report report){
        courseRepository.getById(courseId);
    }


    public Course getCourseByCode(String courseCode){
        return courseRepository.findByCourseCode(courseCode).orElseThrow(
                () -> new EntityNotFoundException());
    }
}
