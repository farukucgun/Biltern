package Caffe.BilternServer.AssignmentManager;


import Caffe.BilternServer.Course.Course;
import Caffe.BilternServer.Course.CourseRepository;
import Caffe.BilternServer.Report.Report;
import Caffe.BilternServer.Report.ReportRepository;

import Caffe.BilternServer.users.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;

@Service
public class AssignmentService {

    private ReportRepository reportRepository;
    private CourseRepository courseRepository;
    private StudentRepository studentRepository;
    private GraderRepository graderRepository;
    private TeachingAssistantRepository TARepository;

    @Autowired
    public AssignmentService(ReportRepository reportRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository,
                             GraderRepository graderRepository,
                             TeachingAssistantRepository TARepository) {
        this.reportRepository = reportRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.graderRepository = graderRepository;
        this.TARepository = TARepository;
    }

    @Transactional
    public void addStudentToCourse(Long studentId, Long courseId){

        Report report = new Report();
        Student student = studentRepository.getById(studentId);
        Course course = courseRepository.getById(courseId);

        report.setStudent(student);
        report.setCourse(course);
        report = reportRepository.save(report);

        student.getReports().add(report);
        course.getReports().add(report);

        courseRepository.save(course);
        studentRepository.save(student);
    }
    @Transactional
    public void addReportToGrader(Long reportId, Long graderId){
        Report report = reportRepository.getById(reportId);
        Grader grader = graderRepository.getById(graderId);

        report.setGrader(grader);
        grader.getReport().add(report);

        reportRepository.save(report);
        graderRepository.save(grader);
    }

    @Transactional
    public void addReportToTeachingAssistant(Long reportId, Long TAId) {
        Report report = reportRepository.getById(reportId);
        TeachingAssistant TA = TARepository.getById(TAId);

        report.setTA(TA);
        TA.getReports().add(report);

        reportRepository.save(report);
        TARepository.save(TA);
    }

}
