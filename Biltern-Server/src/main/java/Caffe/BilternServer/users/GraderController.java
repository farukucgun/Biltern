package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Grader> getGraders() { return graderService.getGraders(); }

    @PostMapping
    public void addGrader(@RequestBody Grader grader) { graderService.addGrader(grader); }

    @DeleteMapping(path = "{id}")
    public void deleteGrader(@PathVariable("id") Long id) { graderService.deleteGrader(id); }
}
