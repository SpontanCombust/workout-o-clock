package com.spontancombust.workoutoclock.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.WorkoutSet;


public interface WorkoutSetRepository extends JpaRepository<WorkoutSet, Long> {

}
