package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
