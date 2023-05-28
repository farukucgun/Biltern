package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("grader")
public class GraderController {

    private final GraderService graderService;

    @Autowired
    public GraderController(GraderService graderService) {
        this.graderService = graderService;
    }

    @GetMapping(path = "/details/what")
    public List<Grader> getGraders() { return graderService.getGraders(); }

    @PostMapping
    public void addGrader(@RequestBody Grader grader) { graderService.addGrader(grader); }

    @DeleteMapping(path = "{id}")
    public void deleteGrader(@PathVariable("id") Long id) { graderService.deleteGrader(id); }

    @GetMapping("details")
    public ResponseEntity<GraderDTO> getGraderDetails() {
        BilternUser grader = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(graderService.getGraderDetails(grader.getBilkentId()));
    }
}
