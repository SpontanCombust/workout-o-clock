package com.spontancombust.workoutoclock.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spontancombust.workoutoclock.model.WorkoutTask;


public interface WorkoutTaskRepository extends JpaRepository<WorkoutTask, Long> {
    List<WorkoutTask> findAllBySetId(Long id);
    List<WorkoutTask> findAllBySetIdOrderByIndex(Long id);
    void deleteAllBySetId(Long id);

    @Query("SELECT MAX(t.index) FROM WorkoutTask t WHERE t.setId = ?1")
    Integer findMaxIndexBySetId(Long id);
}
