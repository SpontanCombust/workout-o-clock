package com.spontancombust.workoutoclock.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;


public class UserPrincipalAuthToken extends AbstractAuthenticationToken {
    private final UserPrincipal principal;

    public UserPrincipalAuthToken(UserPrincipal principal) {
        super(principal.getAuthorities());
        this.principal = principal;
        this.setAuthenticated(true);
    }


    @Override
    public Object getCredentials() {
        return principal.getPassword();
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
    
}
