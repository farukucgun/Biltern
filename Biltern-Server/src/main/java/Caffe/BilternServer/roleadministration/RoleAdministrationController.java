package Caffe.BilternServer.roleadministration;

import Caffe.BilternServer.auth.BilternUserRole;
import Caffe.BilternServer.auth.BilternUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import java.util.List;

/**
 * @author jmo
 * @date 6.05.2023
 */


@RestController
@RequestMapping("user/administration")
public class RoleAdministrationController {
    private final BilternUserService bilternUserService;

    @Autowired
    public RoleAdministrationController(
            BilternUserService bilternUserService){
        this.bilternUserService = bilternUserService;
    }

    @PatchMapping("assignRoleToUsers/{bilternUserRole}")
    public void assignRoleToUsers(@RequestBody List<Long> userIdList,
                                          @PathVariable BilternUserRole bilternUserRole){
        bilternUserService.assignUsersToRole(userIdList, bilternUserRole);
    }

    @PostMapping("register")
    public void registerUser(@Valid @RequestBody UserRegisterationRequest userRegisterationRequest) throws InstanceAlreadyExistsException {
        bilternUserService.registerUser(userRegisterationRequest);
    }
}
