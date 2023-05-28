package Caffe.BilternServer.users;

import Caffe.BilternServer.auth.BilternUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "${client.domain}")
@RestController
@RequestMapping("student")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public void addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
    }

    @DeleteMapping(path = "{id}")
    public void deleteStudent(@PathVariable("id") Long id) {
        studentService.deleteStudent(id);
    }


    @GetMapping("details")
    public ResponseEntity<StudentDTO> getStudentDetails(){

        BilternUser student = (BilternUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.getStudentDetails(student.getBilkentId()));

    }

    @GetMapping("/details/{studentId}")
    public ResponseEntity<StudentDTO> getStudentDetailsById(@PathVariable Long studentId){
        return ResponseEntity.ok(studentService.getStudentDetails(studentId));
    }

}
