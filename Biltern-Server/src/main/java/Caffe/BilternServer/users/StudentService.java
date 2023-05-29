package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This is the service class for the user with type Student
 */

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        Optional<Student> studentOptional = studentRepository.findStudentByUserName(student.getUserName());
        if (studentOptional.isPresent()) {
            throw new IllegalStateException("A student with that username already exists.");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new IllegalStateException("A student with that ID does not exist.");
        }
        studentRepository.deleteById(id);
    }


    public StudentDTO getStudentDetails(Long studentId) {

        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new EntityNotFoundException()
        );

        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setDepartment(student.getDepartment());
        List <Report> reports = student.getReports();
        List<ReportDTO> reportDTOs = new ArrayList<>();

        for(Report report : reports){
            reportDTOs.add(new ReportDTO(report));
        }

        studentDTO.setReports(reportDTOs);

        return studentDTO;
    }
}
