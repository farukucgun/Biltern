package Caffe.BilternServer.auth;


import java.util.ArrayList;
import java.util.List;

import Caffe.BilternServer.notification.Notification;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.hibernate.annotations.CascadeType;

import java.util.Collection;

/**
 * @author jmo
 * @date 14.03.2023
 */

@Entity
@Table(name = "biltern_user")
public class BilternUser implements UserDetails {


    @Id
    private Long bilkentId;
    private String userName;

    @Column(unique = true)
    private String bilkentMail;
    private String password;

    private BilternUserRole bilternUserRole;

    @OneToMany(mappedBy = "bilternUser", fetch = FetchType.LAZY)
    @Cascade(CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    public Long getBilkentId() {
        return bilkentId;
    }

    public String getUserName() {
        return userName;
    }

    public String getBilkentMail() {
        return bilkentMail;
    }

    public void setBilkentId(Long bilkentId) {
        this.bilkentId = bilkentId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setBilkentMail(String bilkentMail) {
        this.bilkentMail = bilkentMail;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return userName;
    }

    public BilternUserRole getBilternUserRole() {
        return bilternUserRole;
    }

    public void setBilternUserRole(BilternUserRole bilternUserRole) {
        this.bilternUserRole = bilternUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority("ROLE_" + bilternUserRole.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
