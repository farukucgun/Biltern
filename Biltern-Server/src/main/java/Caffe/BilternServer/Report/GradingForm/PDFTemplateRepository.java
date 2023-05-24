package Caffe.BilternServer.Report.GradingForm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PDFTemplateRepository extends JpaRepository<PDFTemplate, Long> {
}
