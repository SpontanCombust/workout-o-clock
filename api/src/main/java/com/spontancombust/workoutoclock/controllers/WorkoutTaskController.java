package com.spontancombust.workoutoclock.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import com.spontancombust.workoutoclock.dto.WorkoutTaskControllerDtos.CreateWorkoutTaskRequestDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskControllerDtos.UpdateWorkoutTaskRequestDto;
import com.spontancombust.workoutoclock.dto.common.WorkoutTaskDto;
import com.spontancombust.workoutoclock.dto.common.WorkoutTaskRepsObjectiveDto;
import com.spontancombust.workoutoclock.dto.common.WorkoutTaskTimeObjectiveDto;
import com.spontancombust.workoutoclock.model.WorkoutTask;
import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;
import com.spontancombust.workoutoclock.security.UserPrincipal;
import com.spontancombust.workoutoclock.services.WorkoutTaskService;



@RestController
@RequestMapping("/workoutSets/{setId}/tasks")
@RequiredArgsConstructor
public class WorkoutTaskController {
    
    private final WorkoutTaskService workoutService;


    @PostMapping("/")
    public ResponseEntity<WorkoutTaskDto> createWorkoutTask(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long setId, 
        @RequestBody CreateWorkoutTaskRequestDto newTaskDetailsDto
    ) {
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
        //TODO exception for invalid task objective

        var newTaskModel = workoutService.createWorkoutTaskCheckUser(
            principal.getUserId(),
            setId,
            newTaskDetailsDto.getTitle(),
            objectiveType,
            objectiveReps,
            objectiveTimeSecs,
            newTaskDetailsDto.getCardColorHex()
        );
        
        var createdTaskDto = Converters.workoutTaskDto.fromModel(newTaskModel);
        return ResponseEntity.ok(createdTaskDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutTaskDto> updateWorkoutTask(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long setId, @PathVariable Long id, 
        @RequestBody UpdateWorkoutTaskRequestDto updatedTaskDetailsDto
    ) {
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

        updatedTaskModel = workoutService.updateWorkoutTaskCheckUser(updatedTaskModel, principal.getUserId());
        var updatedTaskDto = Converters.workoutTaskDto.fromModel(updatedTaskModel);
        return ResponseEntity.ok(updatedTaskDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteWorkoutTask(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long setId, @PathVariable Long id
    ) {
        var deleted = workoutService.deleteWorkoutTaskByIdCheckUser(id, principal.getUserId());
        return ResponseEntity.ok(deleted);
    }

    @GetMapping("/")
    public ResponseEntity<List<WorkoutTaskDto>> getAllWorkoutTasks(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long setId
    ) {
        var allWorkoutTasksDtos = workoutService.getAllWorkoutTasksBySetIdCheckUser(setId, principal.getUserId(), true).stream()
                                    .map(m -> Converters.workoutTaskDto.fromModel(m))
                                    .collect(Collectors.toList());

        return ResponseEntity.ok(allWorkoutTasksDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutTaskDto> getWorkoutTaskById(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long setId, @PathVariable Long id
    ) {
        var workoutTaskModel = workoutService.getWorkoutTaskByIdCheckUser(id, principal.getUserId());
        var workoutTaskDto = Converters.workoutTaskDto.fromModel(workoutTaskModel);
        return ResponseEntity.ok(workoutTaskDto);
    }
}
