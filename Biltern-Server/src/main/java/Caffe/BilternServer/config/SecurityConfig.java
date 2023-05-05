package Caffe.BilternServer.config;

import Caffe.BilternServer.auth.BilternUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author jmo
 * @date 14.03.2023
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig {



    private final AuthenticationConfiguration authenticationConfiguration;
    private final BilternUserService bilternUserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final ForgotPasswordJWTFilter forgotPasswordJWTFilter;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration,
                          BilternUserService bilternUserService,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          ForgotPasswordJWTFilter forgotPasswordJWTFilter,
                          PasswordEncoder passwordEncoder) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.bilternUserService = bilternUserService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.forgotPasswordJWTFilter = forgotPasswordJWTFilter;
        this.passwordEncoder = passwordEncoder;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {


        httpSecurity
                .cors()
                .and()
                .csrf()
                    .disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                    .requestMatchers("/auth/login")
                        .permitAll()
                    .requestMatchers("/auth/resetPassword")
                        .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
                    .disable()
                .formLogin()
                    .disable()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(forgotPasswordJWTFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter, ForgotPasswordJWTFilter.class);

        return (SecurityFilterChain) httpSecurity.build();
    }


    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() throws Exception {

        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(bilternUserService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);

        return daoAuthenticationProvider;
    }


}
