package com.spontancombust.workoutoclock.services;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.ObjectAlreadyExistsException;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.WorkoutSet;
import com.spontancombust.workoutoclock.repositories.WorkoutSetRepository;
import com.spontancombust.workoutoclock.repositories.WorkoutTaskRepository;


public interface WorkoutSetService {
    WorkoutSet createWorkoutSet(
        Long userId,
        String title,
        String cardColorHex
    ) throws ObjectAlreadyExistsException;

    WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException;

    Boolean deleteWorkoutSetById(Long id);
    
    Boolean deleteWorkoutSetByIdCheckUser(Long id, Long userId);

    List<WorkoutSet> getAllWorkoutSets();

    List<WorkoutSet> getAllWorkoutSetsForUser(Long userId);

    WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException;

    WorkoutSet getWorkoutSetByIdCheckUser(Long id, Long userId) throws ObjectNotFoundException;    
}




@Service
@RequiredArgsConstructor
class WorkoutSetServiceImpl implements WorkoutSetService {
    
    private final WorkoutSetRepository setRepository;
    private final WorkoutTaskRepository taskRepository;


    @Override
    public WorkoutSet createWorkoutSet(
        Long userId,
        String title,
        String cardColorHex
    ) throws ObjectAlreadyExistsException {
        var newSet = new WorkoutSet(
            null,
            userId,
            null,
            title,
            cardColorHex
        );

        return setRepository.save(newSet);
    }

    @Override
    public WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException {
        if (!setRepository.existsByIdAndUserId(updatedSet.getId(), updatedSet.getUserId())) {
            throw new ObjectNotFoundException("WorkoutSet");
        }

        return setRepository.save(updatedSet);
    }

    @Override
    public Boolean deleteWorkoutSetById(Long id) {
        if (setRepository.existsById(id)) {
            taskRepository.deleteAllBySetId(id);
            setRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean deleteWorkoutSetByIdCheckUser(Long id, Long userId) {
        if (setRepository.existsByIdAndUserId(id, userId)) {
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
    public List<WorkoutSet> getAllWorkoutSetsForUser(Long userId) {
        return setRepository.findAllByUserId(userId);
    }

    @Override
    public WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException {
        return setRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("WorkoutSet"));
    }

    @Override
    public WorkoutSet getWorkoutSetByIdCheckUser(Long id, Long userId) throws ObjectNotFoundException {
        return setRepository.findByIdAndUserId(id, userId).orElseThrow(() -> new ObjectNotFoundException("WorkoutSet"));
    }
}