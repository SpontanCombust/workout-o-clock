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
import com.spontancombust.workoutoclock.dto.WorkoutSetDetailsDto;
import com.spontancombust.workoutoclock.dto.WorkoutSetDto;
import com.spontancombust.workoutoclock.services.WorkoutService;



@RestController
@RequestMapping("/workoutSets")
@RequiredArgsConstructor
public class WorkoutSetController {
    @Autowired
    private final WorkoutService workoutService;


    @PostMapping("/")
    public ResponseEntity<WorkoutSetDto> createWorkoutSet(@RequestBody WorkoutSetDetailsDto newSetDetailsDto) {
        var newSetModel = Converters.workoutSetDetailsDto.toModel(newSetDetailsDto);
        var createdSetModel = workoutService.createWorkoutSet(newSetModel);
        var createdSetDto = Converters.workoutSetDto.fromModel(createdSetModel);
        return ResponseEntity.ok(createdSetDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutSetDto> updateWorkoutSet(@PathVariable Long id, @RequestBody WorkoutSetDetailsDto updatedSetDetailsDto) {
        var updatedSetModel = Converters.workoutSetDetailsDto.toModel(updatedSetDetailsDto);
        updatedSetModel.setId(id);
        updatedSetModel = workoutService.updateWorkoutSet(updatedSetModel);
        var updatedSetDto = Converters.workoutSetDto.fromModel(updatedSetModel);
        return ResponseEntity.ok(updatedSetDto);
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
