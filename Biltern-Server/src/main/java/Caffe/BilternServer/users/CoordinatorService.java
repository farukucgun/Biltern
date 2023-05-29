package Caffe.BilternServer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This is the service class for the user with type Coordinator
 */
@Service
public class CoordinatorService {

    private final CoordinatorRepository coordinatorRepository;

    @Autowired
    public CoordinatorService(CoordinatorRepository coordinatorRepository) {
        this.coordinatorRepository = coordinatorRepository;
    }

    public List<Coordinator> getCoordinators() { return coordinatorRepository.findAll(); }

    public void addCoordinator(Coordinator coordinator) {
        Optional<Coordinator> coordinatorOptional = coordinatorRepository.findCoordinatorByUserName(coordinator.getUserName());
        if (coordinatorOptional.isPresent()) {
            throw new IllegalStateException("A coordinator with that username already exists.");
        }
        coordinatorRepository.save(coordinator);
    }

    public void deleteCoordinator(Long id) {
        if (!coordinatorRepository.existsById(id)) {
            throw new IllegalStateException("A coordinator with that ID does not exist.");
        }
        coordinatorRepository.deleteById(id);
    }
}
