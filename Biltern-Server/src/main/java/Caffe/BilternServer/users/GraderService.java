package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GraderService {

    private final GraderRepository graderRepository;

    @Autowired
    public GraderService(GraderRepository graderRepository) {
        this.graderRepository = graderRepository;
    }

    public List<Grader> getGraders() { return graderRepository.findAll(); }

    public void addGrader(Grader grader) {
        Optional<Grader> graderOptional = graderRepository.findGraderByUserName(grader.getUserName());
        if (graderOptional.isPresent()) {
            throw new IllegalStateException("A grader with that username already exists.");
        }
        graderRepository.save(grader);
    }

    public void deleteGrader(Long id) {
        if (!graderRepository.existsById(id)) {
            throw new IllegalStateException("A grader with that ID does not exist.");
        }
        graderRepository.deleteById(id);
    }
}
