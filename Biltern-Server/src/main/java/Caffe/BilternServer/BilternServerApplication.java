package Caffe.BilternServer;

import Caffe.BilternServer.auth.BilternUser;
import Caffe.BilternServer.auth.BilternUserRepo;
import Caffe.BilternServer.auth.BilternUserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BilternServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BilternServerApplication.class, args);
	}


}
