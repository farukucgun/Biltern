package Caffe.BilternServer.users;

import Caffe.BilternServer.course.Course;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;

/**
 * This is the service class for the user with type Secretary
 */

@Service
public class SecretaryService {

    private final SecretaryRepository secretaryRepository;

    @Autowired
    public SecretaryService(SecretaryRepository secretaryRepository) {
        this.secretaryRepository = secretaryRepository;
    }

    public List<Secretary> getSecretaries() { return secretaryRepository.findAll(); }

    public void addSecretary(Secretary secretary) {
        Optional<Secretary> secretaryOptional = secretaryRepository.findSecretaryByUserName(secretary.getUserName());
        if (secretaryOptional.isPresent()) {
            throw new IllegalStateException("A secretary with that username already exists.");
        }
        secretaryRepository.save(secretary);
    }

    public void deleteSecretary(Long id) {
        if (!secretaryRepository.existsById(id)) {
            throw new IllegalStateException("A secretary with that ID does not exist.");
        }
        secretaryRepository.deleteById(id);
    }


    public SecretaryDTO getSecretaryDetails(Long id){
        Secretary secretary = secretaryRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException()
        );


        SecretaryDTO secretaryDTO = new SecretaryDTO();
        Map<String, Long> courseMap = new HashMap<>();

        for(Course course: secretary.getCourses()){
            courseMap.put(course.getCourseCode(), course.getId());
        }

        secretaryDTO.setDepartment(secretary.getDepartment());
        secretaryDTO.setCourseMap(courseMap);


        return secretaryDTO;
    }



}
