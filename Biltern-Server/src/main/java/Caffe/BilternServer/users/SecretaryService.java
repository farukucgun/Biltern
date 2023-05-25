package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
