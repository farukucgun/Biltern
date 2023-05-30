package Caffe.BilternServer.report.GradingForm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the repository interface for the GradingForm object
 */
@Repository
public interface GradingFormRepository extends JpaRepository<GradingForm, Long> {
    Optional<GradingForm> findByReportId(Long reportId);
}
