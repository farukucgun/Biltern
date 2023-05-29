package Caffe.BilternServer.statistics;

import Caffe.BilternServer.course.CourseService;
import Caffe.BilternServer.report.ReportService;
import Caffe.BilternServer.report.ReportStats;
import Caffe.BilternServer.auth.BilternUser;
import Caffe.BilternServer.auth.BilternUserRole;
import Caffe.BilternServer.auth.BilternUserService;
import Caffe.BilternServer.users.Coordinator;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.TeachingAssistant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.InvalidObjectException;
import java.util.Map;
import java.util.List;

/**
 * This is the service class for statistics, including grader statistics, TA statistics, and department/course statistics
 */

@Service
public class StatisticsService {


    private final BilternUserService bilternUserService;

    private final ReportService reportService;

    private final CourseService courseService;

    @Autowired
    public StatisticsService(
            BilternUserService bilternUserService,
            ReportService reportService,
            CourseService courseService) {
        this.bilternUserService = bilternUserService;
        this.reportService = reportService;
        this.courseService = courseService;
    }

    public Map<ReportStats, Integer> getGraderStatistics(Long Id) throws InvalidObjectException {
        BilternUser grader = bilternUserService.loadUserById(Id);

        if(grader.getBilternUserRole() != BilternUserRole.FACULTY_MEMBER){
            throw new InvalidObjectException("User with id:"+ Id + "is not a Grader");
        }

        return reportService.getGraderStats((Grader)grader);
    }

    public Map<ReportStats, Integer> getTAStatistics(Long teachingAssistantId) throws InvalidObjectException {
        BilternUser teachingAssistant = bilternUserService.loadUserById(teachingAssistantId);

        if(teachingAssistant.getBilternUserRole() != BilternUserRole.TEACHING_ASSISTANT){
            throw new InvalidObjectException("User with id:" + teachingAssistantId + "is not a Teaching Assistant");
        }

        return reportService.getTAStats((TeachingAssistant) teachingAssistant);
    }


    public List<Map<ReportStats, Integer>> getDepartmentCourseStatistics(){

        Coordinator coordinator =
                (Coordinator) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return reportService.getDepartmentStats(coordinator.getDepartment());
    }

}
