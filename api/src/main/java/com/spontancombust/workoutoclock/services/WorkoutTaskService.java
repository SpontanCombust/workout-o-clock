package com.spontancombust.workoutoclock.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.InvalidWorkoutTaskIndexException;
import com.spontancombust.workoutoclock.exceptions.ObjectAlreadyExistsException;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.WorkoutTask;
import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;
import com.spontancombust.workoutoclock.repositories.WorkoutSetRepository;
import com.spontancombust.workoutoclock.repositories.WorkoutTaskRepository;


public interface WorkoutTaskService {
    WorkoutTask createWorkoutTask(
        Long setId,
        String title,
        WorkoutTaskObjectiveType objectiveType,
        Integer objectiveReps,
        Integer objectiveTimeSecs,
        String cardColorHex
    ) throws ObjectAlreadyExistsException;

    WorkoutTask createWorkoutTaskCheckUser(
        Long userId,
        Long setId,
        String title,
        WorkoutTaskObjectiveType objectiveType,
        Integer objectiveReps,
        Integer objectiveTimeSecs,
        String cardColorHex
    ) throws ObjectAlreadyExistsException;

    WorkoutTask updateWorkoutTask(WorkoutTask updatedTask) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException;

    WorkoutTask updateWorkoutTaskCheckUser(WorkoutTask updatedTask, Long userId) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException;

    Boolean deleteWorkoutTaskById(Long id);

    Boolean deleteWorkoutTaskByIdCheckUser(Long id, Long userId);

    List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId, boolean orderByIndex);

    List<WorkoutTask> getAllWorkoutTasksBySetIdCheckUser(Long setId, Long userId, boolean orderByIndex);

    WorkoutTask getWorkoutTaskById(Long id) throws ObjectNotFoundException;

    WorkoutTask getWorkoutTaskByIdCheckUser(Long id, Long userId);

    WorkoutTask getWorkoutTaskRefById(Long id);
}




@Service
@RequiredArgsConstructor
class WorkoutTaskServiceImpl implements WorkoutTaskService {
    
    private final WorkoutTaskRepository taskRepository;
    private final WorkoutSetRepository setRepository;


    @Override
    @Transactional
    public WorkoutTask createWorkoutTask(
        Long setId,
        String title,
        WorkoutTaskObjectiveType objectiveType,
        Integer objectiveReps,
        Integer objectiveTimeSecs,
        String cardColorHex
    ) {   
        Integer maxIndex = taskRepository.findMaxIndexBySetId(setId);
        Integer newIndex = maxIndex != null ? maxIndex + 1 : 0;

        WorkoutTask newTask = new WorkoutTask(
            null, 
            this.setRepository.getReferenceById(setId),
            newIndex, 
            title, 
            objectiveType, 
            objectiveReps, 
            objectiveTimeSecs,
            cardColorHex
        );

        return taskRepository.save(newTask);
    }

    @Override
    public WorkoutTask createWorkoutTaskCheckUser(
        Long userId,
        Long setId,
        String title,
        WorkoutTaskObjectiveType objectiveType,
        Integer objectiveReps,
        Integer objectiveTimeSecs,
        String cardColorHex
    ) throws ObjectAlreadyExistsException {
        if (!setRepository.existsByIdAndUserId(setId, userId)) {
            throw new ObjectNotFoundException("WorkoutSet");
        }

        return this.createWorkoutTask(setId, title, objectiveType, objectiveReps, objectiveTimeSecs, cardColorHex);
    }

    @Override
    @Transactional
    public WorkoutTask updateWorkoutTask(WorkoutTask updatedTask) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException {
        if (!taskRepository.existsById(updatedTask.getId())) {
            throw new ObjectNotFoundException("WorkoutTask");
        }

        var currentTaskIndex = this.getWorkoutTaskById(updatedTask.getId()).getIndex();

        // if an index of the task was changed the entire set has to account for that
        if (updatedTask.getIndex() != currentTaskIndex) {
            var allTasksSorted = this.getAllWorkoutTasksBySetId(updatedTask.getSet().getId(), true);

            if (updatedTask.getIndex() < 0 || updatedTask.getIndex() >= allTasksSorted.size()) {
                throw new InvalidWorkoutTaskIndexException(updatedTask.getIndex());
            }


            allTasksSorted.removeIf(t -> t.getId().equals(updatedTask.getId()));
            allTasksSorted.add(updatedTask.getIndex(), updatedTask);

            for(int i = 0; i < allTasksSorted.size(); i += 1) {
                allTasksSorted.get(i).setIndex(i);
            }
            

            var savedUpdatedTask = taskRepository.saveAll(allTasksSorted)
                                                .stream()
                                                .filter(t -> t.getId().equals(updatedTask.getId()))
                                                .findFirst()
                                                .get();

            return savedUpdatedTask;
        } else {
            return taskRepository.save(updatedTask);
        }
    }

    @Override
    public WorkoutTask updateWorkoutTaskCheckUser(WorkoutTask updatedTask, Long userId) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException {
        if (!setRepository.existsByIdAndUserId(updatedTask.getSet().getId(), userId)) {
            throw new ObjectNotFoundException("WorkoutSet");
        }

        return this.updateWorkoutTask(updatedTask);
    }

    @Override
    @Transactional
    public Boolean deleteWorkoutTaskById(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);

            // fixing indices of remaining tasks //

            var allTasksSorted = this.getAllWorkoutTasksBySetId(id, true);
            for (int i = 0; i < allTasksSorted.size(); i += 1) {
                allTasksSorted.get(i).setIndex(i);
            }

            taskRepository.saveAll(allTasksSorted);

            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean deleteWorkoutTaskByIdCheckUser(Long id, Long userId) {
        var task = taskRepository.findById(id);
        if (task.map(t -> t.getSet().getId().equals(userId)).orElse(false)) {
            return this.deleteWorkoutTaskById(id);
        } else {
            return false;
        }
    }

    @Override
    public List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId, boolean orderByIndex) {
        if (orderByIndex) {
            return taskRepository.findAllBySetIdOrderByIndex(setId);
        } else {
            return taskRepository.findAllBySetId(setId);
        }
    }

    @Override
    public List<WorkoutTask> getAllWorkoutTasksBySetIdCheckUser(Long setId, Long userId, boolean orderByIndex) {
        if (setRepository.existsByIdAndUserId(setId, userId)) {
            return this.getAllWorkoutTasksBySetId(setId, orderByIndex);
        }

        return List.of();
    }

    @Override
    public WorkoutTask getWorkoutTaskById(Long id) throws ObjectNotFoundException {
        return taskRepository.findById(id)
                    .orElseThrow(() -> new ObjectNotFoundException("WorkoutTask"));
    }

    @Override
    public WorkoutTask getWorkoutTaskByIdCheckUser(Long id, Long userId) {
        return taskRepository.findById(id)
                    .filter(t -> t.getSet().getId().equals(userId))
                    .orElseThrow(() -> new ObjectNotFoundException("WorkoutTask"));
    }

    @Override
    public WorkoutTask getWorkoutTaskRefById(Long id) {
        return taskRepository.getReferenceById(id);
    }
}