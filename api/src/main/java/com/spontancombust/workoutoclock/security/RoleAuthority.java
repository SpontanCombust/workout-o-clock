/*
package com.spontancombust.workoutoclock.security;

import org.springframework.security.core.GrantedAuthority;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.model.Role;


@RequiredArgsConstructor
@Getter
public class RoleAuthority implements GrantedAuthority {

    private final Role role;

    @Override
    public String getAuthority() {
        return "ROLE_" + this.role.toString();
    }
}
*/