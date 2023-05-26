package Caffe.BilternServer.AssignmentManager;


import Caffe.BilternServer.Course.Course;
import Caffe.BilternServer.Course.CourseRepository;
import Caffe.BilternServer.Report.Report;
import Caffe.BilternServer.Report.ReportRepository;
import Caffe.BilternServer.Report.ReportService;
import Caffe.BilternServer.users.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void addReportToCourse(Long reportId, Long courseId){
        Report report = reportRepository.getById(reportId);
        Course course = courseRepository.getById(courseId);


        course.getReports().add(report);

        reportRepository.save(report);
        courseRepository.save(course);
    }

    public void addReportToGrader(Long reportId, Long graderId){
        Report report = reportRepository.getById(reportId);
        Grader grader = graderRepository.getById(graderId);

        report.setGrader(grader);
        grader.getReport().add(report);

        reportRepository.save(report);
        graderRepository.save(grader);
    }

    public void addReportToTeachingAssistant(Long reportId, Long TAId) {
        Report report = reportRepository.getById(reportId);
        TeachingAssistant TA = TARepository.getById(TAId);

        report.setTA(TA);
        TA.getReports().add(report);

        reportRepository.save(report);
        TARepository.save(TA);
    }

}
