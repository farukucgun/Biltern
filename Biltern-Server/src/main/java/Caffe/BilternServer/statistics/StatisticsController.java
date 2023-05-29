package Caffe.BilternServer.statistics;

import Caffe.BilternServer.report.ReportStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.InvalidObjectException;
import java.util.List;
import java.util.Map;

/**
 * @author jmo
 * @date 26.05.2023
 */

@PreAuthorize("hasAnyAuthority('ROLE_DEPARTMENT_COORDINATOR', 'ROLE_SECRETARY')")
@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("statistics")
public class StatisticsController {


    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }



   @GetMapping("grader/{graderId}")
    public ResponseEntity<Map<ReportStats, Integer>> getGraderStatistics(@PathVariable Long graderId) throws InvalidObjectException {

        return ResponseEntity.ok(statisticsService.getGraderStatistics(graderId));
    }

    @GetMapping("teachingAssistant/{teachingAssistantId}")
    public ResponseEntity<Map<ReportStats, Integer>> getTAStatistics(Long teachingAssistantId) throws InvalidObjectException {


        return ResponseEntity.ok(statisticsService.getTAStatistics(teachingAssistantId));
    }



    @GetMapping
    public ResponseEntity<List<Map<ReportStats, Integer>>> getDepartmentCourseStatistics(){

        return ResponseEntity.ok(statisticsService.getDepartmentCourseStatistics());
    }

}
