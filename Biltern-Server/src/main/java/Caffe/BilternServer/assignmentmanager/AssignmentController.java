package Caffe.BilternServer.assignmentmanager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.management.InstanceAlreadyExistsException;
import java.io.IOException;

@RestController
@RequestMapping("/init")
public class AssignmentController {

    private AssignmentService assignmentService;
    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

   @PostMapping
    public void init(@RequestBody MultipartFile file) throws InstanceAlreadyExistsException, IOException {
        assignmentService.parseExcelSheet(file);
   }
}
