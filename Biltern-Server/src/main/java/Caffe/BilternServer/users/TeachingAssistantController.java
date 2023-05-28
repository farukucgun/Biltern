package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("teachingassistant")
public class TeachingAssistantController {
    private final TeachingAssistantService teachingAssistantService;

    @Autowired
    public TeachingAssistantController(TeachingAssistantService teachingAssistantService) {
        this.teachingAssistantService = teachingAssistantService;
    }

    @GetMapping
    public List<TeachingAssistant> getTeachingAssistants() { return teachingAssistantService.getTeachingAssistants(); }

    @PostMapping
    public void addTeachingAssistant(@RequestBody TeachingAssistant teachingAssistant) { teachingAssistantService.addTeachingAssistant(teachingAssistant); }

    @DeleteMapping(path = "{id}")
    public void deleteTeachingAssistant(@PathVariable("id") Long id) {
        teachingAssistantService.deleteTeachingAssistant(id);
    }

    @GetMapping("/details")
    public ResponseEntity<TeachingAssistantDTO> getTADetails() {
        BilternUser teachingAssistant = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(teachingAssistantService.getTADetails(teachingAssistant.getBilkentId()));
    }
}
