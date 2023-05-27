package Caffe.BilternServer.report;

import Caffe.BilternServer.course.Course;
import Caffe.BilternServer.users.Grader;
import Caffe.BilternServer.users.TeachingAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findReportById(Long reportId);
    List<Report> findAll();
    Integer countAllByTAAndReportStats(TeachingAssistant teachingAssistant, ReportStats reportStats);

    Integer countAllByGraderAndReportStats(Grader grader, ReportStats reportStats);
    Integer countAllByCourseAndReportStats(Course course, ReportStats reportStats);
}
