package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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


    @GetMapping("details")
    public ResponseEntity<SecretaryDTO> getSecretaryDetails(){

        BilternUser secretary = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(secretaryService.getSecretaryDetails(secretary.getBilkentId()));
    }
}
