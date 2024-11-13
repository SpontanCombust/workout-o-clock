package com.spontancombust.workoutoclock.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
