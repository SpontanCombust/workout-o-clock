package com.spontancombust.workoutoclock.exceptions;


public class InvalidWorkoutTaskIndexException extends RuntimeException {
    public InvalidWorkoutTaskIndexException(Integer taskIndex) {
        super("Task index " + taskIndex + " is invalid for the set");
    }
}
