package com.spontancombust.workoutoclock.services;

import org.springframework.stereotype.Service;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.User;
import com.spontancombust.workoutoclock.repositories.UserRepository;

import lombok.AllArgsConstructor;



public interface UserService {

    User getByEmail(String email) throws ObjectNotFoundException;
    
}


@Service
@AllArgsConstructor
class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public User getByEmail(String email) throws ObjectNotFoundException {
        var user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new ObjectNotFoundException("User");
        }

        return user.get();
    }
}