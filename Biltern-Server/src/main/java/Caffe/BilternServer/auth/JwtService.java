package Caffe.BilternServer.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

/**
 * @author jmo
 * @date 14.03.2023
 */


@ConfigurationProperties(prefix = "jwt")
@Service
public class JwtService {

    private String jwtHeader;
    private String idHeader;
    private String jwtSecretKey;

    private String signed;

    private int refreshTokenExpiration;
    private int accessTokenExpiration;
    private int onceUseTokenExpiration;

    public String getJwtHeader() {
        return jwtHeader;
    }

    public void setJwtHeader(String jwtHeader) {
        this.jwtHeader = jwtHeader;
    }

    public String getIdHeader() {
        return idHeader;
    }

    public void setIdHeader(String idHeader) {
        this.idHeader = idHeader;
    }

    public void setJwtSecretKey(String jwtSecretKey) {

        this.jwtSecretKey = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());

    }


    public void setOnceUseTokenExpiration(int onceUseTokenExpiration) {
        this.onceUseTokenExpiration = onceUseTokenExpiration;
    }

    public void setRefreshTokenExpiration(int refreshTokenExpiration) {
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public void setAccessTokenExpiration(int accessTokenExpiration) {
        this.accessTokenExpiration = accessTokenExpiration;
    }


    public String generateAccessToken(BilternUser bilternUser, Map<String, Object> claims){
        return generateBearerToken(bilternUser, claims, accessTokenExpiration);
    }

    public String generateRefreshToken(BilternUser bilternUser, Map<String, Object> claims){
        return generateBearerToken(bilternUser, claims, refreshTokenExpiration);
    }

    public String generateOnceUseToken(BilternUser bilternUser, Map<String, Object> claims){

        return generateBearerToken(bilternUser, claims,onceUseTokenExpiration);
    }

    private String generateBearerToken(BilternUser bilternUser, Map<String, Object> claims, int expirationInMinutes){

        return  "Bearer " + Jwts.builder()
                .setClaims(claims)
                .setSubject( String.valueOf(bilternUser.getBilkentId()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(expirationInMinutes)))
                .signWith(Keys.hmacShaKeyFor(getTokenKey(bilternUser, expirationInMinutes)), SignatureAlgorithm.HS256)
                .compact();
    }

    private byte[] getTokenKey(BilternUser bilternUser, int expiration){


        if(expiration == onceUseTokenExpiration){

            signed = Base64.getEncoder().encodeToString(bilternUser.getPassword().getBytes());

            return Base64.getEncoder().encodeToString(bilternUser.getPassword().getBytes()).getBytes();
        }

        signed = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());

        return Base64.getEncoder().encodeToString(jwtSecretKey.getBytes()).getBytes();
    }

    private <T> T extractClaim(
            String token, String key,
            Function<Claims, T> claimsResolver){

        Claims claims = extractAllClaims(token, key);



        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String jwt, String key){


        return Jwts
                .parserBuilder()
                .setSigningKey(Base64.getEncoder().encodeToString(key.getBytes()).getBytes())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public boolean isJWTokenValid(String jwt){
        return extractClaim(jwt, jwtSecretKey, Claims::getExpiration).after(new Date());
    }


    public Long deriveUserId(String jwt) {
        return Long.parseLong(extractClaim(jwt, jwtSecretKey, Claims::getSubject));
    }


    public boolean isJWTokenValid(String jwt, String key){
        return extractClaim(jwt, key, Claims::getExpiration).after(new Date());
    }

}
