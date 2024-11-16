package com.spontancombust.workoutoclock.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.WorkoutSet;


public interface WorkoutSetRepository extends JpaRepository<WorkoutSet, Long> {
    boolean existsByIdAndUserId(Long id, Long userId);
    Optional<WorkoutSet> findByIdAndUserId(Long id, Long userId);
    List<WorkoutSet> findAllByUserId(Long userId);
}
