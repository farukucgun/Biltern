package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeachingAssistantService {
    private final TeachingAssistantRepository teachingAssistantRepository;

    @Autowired
    public TeachingAssistantService(TeachingAssistantRepository teachingAssistantRepository) {
        this.teachingAssistantRepository = teachingAssistantRepository;
    }

    public List<TeachingAssistant> getTeachingAssistants() { return teachingAssistantRepository.findAll(); }

    public void addTeachingAssistant(TeachingAssistant teachingAssistant) {
        Optional<TeachingAssistant> teachingAssistantOptional = teachingAssistantRepository.findTeachingAssistantByUserName(teachingAssistant.getUserName());
        if (teachingAssistantOptional.isPresent()) {
            throw new IllegalStateException("A teaching assistant with that username already exists.");
        }
        teachingAssistantRepository.save(teachingAssistant);
    }

    public void deleteTeachingAssistant(Long id) {
        if (!teachingAssistantRepository.existsById(id)) {
            throw new IllegalStateException("A teaching assistant with that ID does not exist.");
        }
        teachingAssistantRepository.deleteById(id);
    }
}
