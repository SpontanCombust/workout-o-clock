package com.spontancombust.workoutoclock.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class UserPrincipal implements UserDetails {

    private final Long userId;

    private final String email;

    @JsonIgnore
    private final String password;

    // private final Collection<RoleAuthority> authorities;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // return authorities;
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
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
