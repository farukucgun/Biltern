package Caffe.BilternServer.report.GradingForm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This is the repository interface for the PDFTemplate object
 */

@Repository
public interface PDFTemplateRepository extends JpaRepository<PDFTemplate, Long> {
}
