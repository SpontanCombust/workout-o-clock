package com.spontancombust.workoutoclock.services;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.User;
import com.spontancombust.workoutoclock.repositories.UserRepository;



public interface UserService {

    User getByEmail(String email) throws ObjectNotFoundException;
    
    User getRefById(Long id);
}


@Service
@AllArgsConstructor
class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getByEmail(String email) throws ObjectNotFoundException {
        var user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new ObjectNotFoundException("User");
        }

        return user.get();
    }

    @Override
    public User getRefById(Long id) {
        return this.userRepository.getReferenceById(id);
    }
}