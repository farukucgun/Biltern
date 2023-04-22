package Caffe.BilternServer.config;

import Caffe.BilternServer.auth.BilternUser;
import Caffe.BilternServer.auth.BilternUserService;
import Caffe.BilternServer.auth.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author jmo
 * @date 14.03.2023
 */



@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final BilternUserService bilternUserService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService, BilternUserService bilternUserService) {
        this.jwtService = jwtService;
        this.bilternUserService = bilternUserService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {



        final String jwtHeader = request.getHeader(jwtService.getJwtHeader());


        if(jwtHeader == null || !jwtHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = jwtHeader.substring(7);

        Long bilkentId;

        try{
            bilkentId = jwtService.deriveUserId(jwt);
        }
        catch (SignatureException | ExpiredJwtException jwtException){
            filterChain.doFilter(request, response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication() != null){
            filterChain.doFilter(request, response);
            return;
        }

        BilternUser bilternUser = bilternUserService.loadUserById(bilkentId);

        if(jwtService.isJWTokenValid(jwt)){
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    bilternUser,
                    null,
                    bilternUser.getAuthorities()
            );

            authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }



        filterChain.doFilter(request, response);
    }
}
