package com.spontancombust.workoutoclock.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.WorkoutTask;


public interface WorkoutTaskRepository extends JpaRepository<WorkoutTask, Long> {
    List<WorkoutTask> findAllBySetId(Long id);
    void deleteAllBySetId(Long id);
}
