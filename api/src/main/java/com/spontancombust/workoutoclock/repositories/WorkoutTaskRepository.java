package com.spontancombust.workoutoclock.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.WorkoutTask;


public interface WorkoutTaskRepository extends JpaRepository<WorkoutTask, Long> {
    
}
