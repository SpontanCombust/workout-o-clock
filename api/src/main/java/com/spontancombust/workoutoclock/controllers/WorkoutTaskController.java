package com.spontancombust.workoutoclock.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/workoutTasks")
public class WorkoutTaskController {
    @GetMapping
    public String getAllTasks() {
        return "task";
    }
}
