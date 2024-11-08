package com.spontancombust.workoutoclock.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.ObjectAlreadyExistsException;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.WorkoutSet;
import com.spontancombust.workoutoclock.model.WorkoutTask;
import com.spontancombust.workoutoclock.repositories.WorkoutSetRepository;
import com.spontancombust.workoutoclock.repositories.WorkoutTaskRepository;



public interface WorkoutService {
    WorkoutSet createWorkoutSet(WorkoutSet newSet) throws ObjectAlreadyExistsException;

    WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException;

    Boolean deleteWorkoutSetById(Long id);

    List<WorkoutSet> getAllWorkoutSets();
    WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException;



    WorkoutTask createWorkoutTask(WorkoutTask newTask);

    WorkoutTask updateWorkoutTask(WorkoutTask updatedTask);

    Boolean deleteWorkoutTaskById(Long id);

    List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId);
    WorkoutTask getWorkoutTaskById(Long id);
}


@Service
@RequiredArgsConstructor
class WorkoutServiceImpl implements WorkoutService {
    @Autowired
    private final WorkoutSetRepository setRepository;

    @Autowired
    private final WorkoutTaskRepository taskRepository;


    @Override
    public WorkoutSet createWorkoutSet(WorkoutSet newSet) throws ObjectAlreadyExistsException {
        if (setRepository.findById(newSet.getId()).isPresent()) {
            throw new ObjectAlreadyExistsException("WorkoutSet", newSet.getId());
        }

        return setRepository.save(newSet);
    }

    @Override
    public WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException {
        if (setRepository.findById(updatedSet.getId()).isEmpty()) {
            throw new ObjectNotFoundException("WorkoutSet", updatedSet.getId());
        }

        return setRepository.save(updatedSet);
    }

    @Override
    public Boolean deleteWorkoutSetById(Long id) {
        if (setRepository.findById(id).isPresent()) {
            taskRepository.deleteAllBySetId(id);
            setRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<WorkoutSet> getAllWorkoutSets() {
        return setRepository.findAll();
    }

    @Override
    public WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException {
        return setRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("WorkoutSet", id));
    }



    @Override
    public WorkoutTask createWorkoutTask(WorkoutTask newTask) {
        if (taskRepository.findById(newTask.getId()).isPresent()) {
            throw new ObjectAlreadyExistsException("WorkoutTask", newTask.getId());
        }

        return taskRepository.save(newTask);
    }

    @Override
    public WorkoutTask updateWorkoutTask(WorkoutTask updatedTask) {
        if (setRepository.findById(updatedTask.getId()).isEmpty()) {
            throw new ObjectNotFoundException("WorkoutTask", updatedTask.getId());
        }

        return taskRepository.save(updatedTask);
    }

    @Override
    public Boolean deleteWorkoutTaskById(Long id) {
        if (taskRepository.findById(id).isPresent()) {
            taskRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId) {
        return taskRepository.findAllBySetId(setId);
    }

    @Override
    public WorkoutTask getWorkoutTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("WorkoutTask", id));
    }

}