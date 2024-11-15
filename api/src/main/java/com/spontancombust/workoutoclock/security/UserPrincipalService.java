package com.spontancombust.workoutoclock.security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

// import com.spontancombust.workoutoclock.model.Role;
import com.spontancombust.workoutoclock.services.UserService;


@Service
@RequiredArgsConstructor
public class UserPrincipalService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userService.getByEmail(username);

        return UserPrincipal.builder()
            .userId(user.getId())
            .email(user.getEmail())
            // .authorities(List.of(new RoleAuthority(Role.USER)))
            .password(user.getPassword())
            .build();
    }
    
}
