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
 * @date 8.05.2023
 */

@Component
public class ForgotPasswordJWTFilter extends OncePerRequestFilter {

    private final BilternUserService bilternUserService;
    private final JwtService jwtService;

    @Autowired
    public ForgotPasswordJWTFilter(BilternUserService bilternUserService, JwtService jwtService) {
        this.bilternUserService = bilternUserService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {



        final String jwtHeader = request.getHeader(jwtService.getJwtHeader());
        final String bilkentIDHeader = request.getHeader(jwtService.getIdHeader());

            if( (jwtHeader == null || bilkentIDHeader == null) || (!jwtHeader.startsWith("Bearer "))){
                filterChain.doFilter(request, response);
                return;
            }

            final String jwt = jwtHeader.substring(7);
            final Long bilkentID;

            try {
                bilkentID = Long.parseLong(bilkentIDHeader);
            }
            catch (NumberFormatException numberFormatException){
            filterChain.doFilter(request, response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication() != null){
            filterChain.doFilter(request, response);
            return;
        }

        BilternUser bilternUser = bilternUserService.loadUserById(bilkentID);

        boolean tokenvalid;

        try{
            tokenvalid = jwtService.isJWTokenValid(jwt, bilternUser.getPassword());
        }
        catch (SignatureException | ExpiredJwtException jwtException){
            filterChain.doFilter(request, response);
            return;
        }


        if(tokenvalid){
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
