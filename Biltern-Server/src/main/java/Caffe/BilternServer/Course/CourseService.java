package Caffe.BilternServer.Course;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
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
}
