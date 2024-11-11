package com.spontancombust.workoutoclock.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.converters.Converters;
import com.spontancombust.workoutoclock.dto.WorkoutSetDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskDetailsDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskRepsObjectiveDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskTimeObjectiveDto;
import com.spontancombust.workoutoclock.model.WorkoutTask;
import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;
import com.spontancombust.workoutoclock.services.WorkoutService;



@RestController
@RequestMapping("/workoutSets/{setId}/tasks")
@RequiredArgsConstructor
public class WorkoutTaskController {
    
    @Autowired
    private final WorkoutService workoutService;


    @PostMapping("/")
    public ResponseEntity<WorkoutTaskDto> createWorkoutTask(@PathVariable Long setId, @RequestBody WorkoutTaskDetailsDto newTaskDetailsDto) {
        WorkoutTaskObjectiveType objectiveType = null;
        Integer objectiveReps = null;
        Integer objectiveTimeSecs = null;

        if (newTaskDetailsDto.getObjective() instanceof WorkoutTaskRepsObjectiveDto) {
            var repsObjective = (WorkoutTaskRepsObjectiveDto)newTaskDetailsDto.getObjective();
            objectiveType = WorkoutTaskObjectiveType.REPS;
            objectiveReps = repsObjective.getReps();
        } else if (newTaskDetailsDto.getObjective() instanceof WorkoutTaskTimeObjectiveDto) {
            var timeObjective = (WorkoutTaskTimeObjectiveDto)newTaskDetailsDto.getObjective();
            objectiveType = WorkoutTaskObjectiveType.TIME;
            objectiveTimeSecs = timeObjective.getTimeSeconds();
        }

        var newTaskModel = workoutService.createWorkoutTask(
            setId,
            newTaskDetailsDto.getTitle(),
            objectiveType,
            objectiveReps,
            objectiveTimeSecs,
            newTaskDetailsDto.getCardColorHex()
        );
        var createdSetDto = Converters.workoutTaskDto.fromModel(newTaskModel);
        return ResponseEntity.ok(createdSetDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutTaskDto> updateWorkoutTask(@PathVariable Long setId, @PathVariable Long id, @RequestBody WorkoutTaskDetailsDto updatedTaskDetailsDto) {
        WorkoutTaskObjectiveType objectiveType = null;
        Integer objectiveReps = null;
        Integer objectiveTimeSecs = null;

        if (updatedTaskDetailsDto.getObjective() instanceof WorkoutTaskRepsObjectiveDto) {
            var repsObjective = (WorkoutTaskRepsObjectiveDto)updatedTaskDetailsDto.getObjective();
            objectiveType = WorkoutTaskObjectiveType.REPS;
            objectiveReps = repsObjective.getReps();
        } else if (updatedTaskDetailsDto.getObjective() instanceof WorkoutTaskTimeObjectiveDto) {
            var timeObjective = (WorkoutTaskTimeObjectiveDto)updatedTaskDetailsDto.getObjective();
            objectiveType = WorkoutTaskObjectiveType.TIME;
            objectiveTimeSecs = timeObjective.getTimeSeconds();
        }


        var updatedTaskModel = new WorkoutTask(
            id,
            setId,
            null,
            updatedTaskDetailsDto.getIndex(),
            updatedTaskDetailsDto.getTitle(),
            objectiveType,
            objectiveReps,
            objectiveTimeSecs,
            updatedTaskDetailsDto.getCardColorHex()
        );

        updatedTaskModel = workoutService.updateWorkoutTask(updatedTaskModel);
        var updatedTaskDto = Converters.workoutTaskDto.fromModel(updatedTaskModel);
        return ResponseEntity.ok(updatedTaskDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteWorkoutSet(@PathVariable Long id) {
        var deleted = workoutService.deleteWorkoutSetById(id);
        return ResponseEntity.ok(deleted);
    }

    @GetMapping("/")
    public ResponseEntity<List<WorkoutSetDto>> getAllWorkoutSets() {
        var allWorkoutSetsDtos = workoutService.getAllWorkoutSets().stream()
                                    .map(m -> Converters.workoutSetDto.fromModel(m))
                                    .collect(Collectors.toList());

        return ResponseEntity.ok(allWorkoutSetsDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSetDto> getWorkoutSetById(@PathVariable Long id) {
        var workoutSetModel = workoutService.getWorkoutSetById(id);
        var workoutSetDto = Converters.workoutSetDto.fromModel(workoutSetModel);
        return ResponseEntity.ok(workoutSetDto);
    }
}
