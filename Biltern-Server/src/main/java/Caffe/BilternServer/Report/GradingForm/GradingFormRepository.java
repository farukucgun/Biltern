package Caffe.BilternServer.Report.GradingForm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GradingFormRepository extends JpaRepository<GradingForm, Long> {
    Optional<GradingForm> findByReport(Long reportId);
}
