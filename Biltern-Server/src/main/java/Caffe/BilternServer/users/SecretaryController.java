package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("secretary")
public class SecretaryController {

    private final SecretaryService secretaryService;

    @Autowired
    public SecretaryController(SecretaryService secretaryService) {
        this.secretaryService = secretaryService;
    }

    @GetMapping
    public List<Secretary> getSecretaries() { return secretaryService.getSecretaries(); }

    @PostMapping
    public void addSecretary(@RequestBody Secretary secretary) { secretaryService.addSecretary(secretary); }

    @DeleteMapping(path = "{id}")
    public void deleteSecretary(@PathVariable("id") Long id) { secretaryService.deleteSecretary(id); }
}
