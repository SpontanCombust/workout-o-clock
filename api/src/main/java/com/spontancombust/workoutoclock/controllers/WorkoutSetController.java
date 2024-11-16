package com.spontancombust.workoutoclock.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.spontancombust.workoutoclock.dto.WorkoutSetDetailsDto;
import com.spontancombust.workoutoclock.dto.WorkoutSetDto;
import com.spontancombust.workoutoclock.model.WorkoutSet;
import com.spontancombust.workoutoclock.security.UserPrincipal;
import com.spontancombust.workoutoclock.services.WorkoutService;



@RestController
@RequestMapping("/workoutSets")
@RequiredArgsConstructor
public class WorkoutSetController {
    @Autowired
    private final WorkoutService workoutService;


    @PostMapping("/")
    public ResponseEntity<WorkoutSetDto> createWorkoutSet(
        @AuthenticationPrincipal UserPrincipal principal, 
        @RequestBody WorkoutSetDetailsDto newSetDetailsDto
    ) {   
        var newSetModel = workoutService.createWorkoutSet(
            principal.getUserId(),
            newSetDetailsDto.getTitle(),
            newSetDetailsDto.getCardColorHex()
        );
        var createdSetDto = Converters.workoutSetDto.fromModel(newSetModel);
        return ResponseEntity.ok(createdSetDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutSetDto> updateWorkoutSet(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long id, 
        @RequestBody WorkoutSetDetailsDto updatedSetDetailsDto
    ) {
        var updatedSetModel = new WorkoutSet(
            id,
            principal.getUserId(),
            null,
            updatedSetDetailsDto.getTitle(),
            updatedSetDetailsDto.getCardColorHex()
        );
        
        updatedSetModel = workoutService.updateWorkoutSet(updatedSetModel);
        var updatedSetDto = Converters.workoutSetDto.fromModel(updatedSetModel);
        return ResponseEntity.ok(updatedSetDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteWorkoutSet(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long id
    ) {
        var deleted = workoutService.deleteWorkoutSetByIdCheckUser(id, principal.getUserId());
        return ResponseEntity.ok(deleted);
    }

    @GetMapping("/")
    public ResponseEntity<List<WorkoutSetDto>> getAllWorkoutSets(
        @AuthenticationPrincipal UserPrincipal principal
    ) {
        var allWorkoutSetsDtos = workoutService.getAllWorkoutSetsForUser(principal.getUserId()).stream()
                                    .map(m -> Converters.workoutSetDto.fromModel(m))
                                    .collect(Collectors.toList());

        return ResponseEntity.ok(allWorkoutSetsDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSetDto> getWorkoutSetById(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable Long id
    ) {
        var workoutSetModel = workoutService.getWorkoutSetByIdCheckUser(id, principal.getUserId());
        var workoutSetDto = Converters.workoutSetDto.fromModel(workoutSetModel);
        return ResponseEntity.ok(workoutSetDto);
    }
}
