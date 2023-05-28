package Caffe.BilternServer.report.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByReportIdAndAndIsPrev(Long reportId, boolean isPrev);

    void deleteByReportIdAndReport_isIteration(Long reportId, boolean isIteration);
}