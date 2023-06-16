package Caffe.BilternServer.report.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the feedback object
 */

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByReportIdAndIsPrev(Long reportId, boolean isPrev);
    Feedback findByReportId(Long reportId);
    void deleteByReportIdAndReportIsIteration(Long reportId, boolean isIteration);
}