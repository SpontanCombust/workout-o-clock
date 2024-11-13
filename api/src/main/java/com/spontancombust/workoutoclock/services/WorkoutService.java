package com.spontancombust.workoutoclock.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.InvalidWorkoutTaskIndexException;
import com.spontancombust.workoutoclock.exceptions.ObjectAlreadyExistsException;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;
import com.spontancombust.workoutoclock.model.WorkoutSet;
import com.spontancombust.workoutoclock.model.WorkoutTask;
import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;
import com.spontancombust.workoutoclock.repositories.WorkoutSetRepository;
import com.spontancombust.workoutoclock.repositories.WorkoutTaskRepository;



public interface WorkoutService {
    WorkoutSet createWorkoutSet(
        String title,
        String cardColorHex
    );

    WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException;

    Boolean deleteWorkoutSetById(Long id);

    List<WorkoutSet> getAllWorkoutSets();
    WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException;



    WorkoutTask createWorkoutTask(
        Long setId,
        String title,
        WorkoutTaskObjectiveType objectiveType,
        Integer objectiveReps,
        Integer objectiveTimeSecs,
        String cardColorHex
    );

    WorkoutTask updateWorkoutTask(WorkoutTask updatedTask) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException;

    Boolean deleteWorkoutTaskById(Long id);

    List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId, boolean orderByIndex);
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
    public WorkoutSet createWorkoutSet(
        String title,
        String cardColorHex
    ) throws ObjectAlreadyExistsException {
        var newSet = new WorkoutSet(
            null,
            null,
            null,
            title,
            cardColorHex
        );

        return setRepository.save(newSet);
    }

    @Override
    public WorkoutSet updateWorkoutSet(WorkoutSet updatedSet) throws ObjectNotFoundException {
        if (!setRepository.existsById(updatedSet.getId())) {
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
    public List<WorkoutSet> getAllWorkoutSets() {
        return setRepository.findAll();
    }

    @Override
    public WorkoutSet getWorkoutSetById(Long id) throws ObjectNotFoundException {
        return setRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("WorkoutSet"));
    }



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
            setId, 
            null,
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
    @Transactional
    public WorkoutTask updateWorkoutTask(WorkoutTask updatedTask) throws ObjectNotFoundException, InvalidWorkoutTaskIndexException {
        if (!taskRepository.existsById(updatedTask.getId())) {
            throw new ObjectNotFoundException("WorkoutTask");
        }

        var currentTaskIndex = this.getWorkoutTaskById(updatedTask.getId()).getIndex();

        // if an index of the task was changed the entire set has to account for that
        if (updatedTask.getIndex() != currentTaskIndex) {
            var allTasksSorted = this.getAllWorkoutTasksBySetId(updatedTask.getSetId(), true);

            if (updatedTask.getIndex() < 0 || updatedTask.getIndex() >= allTasksSorted.size()) {
                throw new InvalidWorkoutTaskIndexException(updatedTask.getIndex());
            }
    

            // bubbling of the workout task towards the destination index //

            var shift = updatedTask.getIndex() < currentTaskIndex ? -1 : 1;
            for (int i = currentTaskIndex + shift; i != updatedTask.getIndex(); i += shift) {
                var prev = allTasksSorted.get(i - shift);
                var curr = allTasksSorted.get(i);

                var tmp = prev.getIndex();
                prev.setIndex(curr.getIndex());
                curr.setIndex(tmp);
            }

            // at this point all tasks are shifted to their appropriate position
            // only thing left is to overwrite the target task in its entirety
            allTasksSorted.set(updatedTask.getIndex(), updatedTask);


            var savedUpdatedTask = taskRepository.saveAll(allTasksSorted)
                                                .stream()
                                                .filter(t -> t.getId() == updatedTask.getId())
                                                .findFirst()
                                                .get();

            return savedUpdatedTask;
        } else {
            return taskRepository.save(updatedTask);
        }
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
    public List<WorkoutTask> getAllWorkoutTasksBySetId(Long setId, boolean orderByIndex) {
        if (orderByIndex) {
            return taskRepository.findAllBySetIdOrderByIndex(setId);
        } else {
            return taskRepository.findAllBySetId(setId);
        }
    }

    @Override
    public WorkoutTask getWorkoutTaskById(Long id) throws ObjectNotFoundException {
        return taskRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("WorkoutTask"));
    }

}