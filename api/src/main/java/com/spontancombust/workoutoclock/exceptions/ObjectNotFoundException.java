package com.spontancombust.workoutoclock.exceptions;

public class ObjectNotFoundException extends RuntimeException {
    public ObjectNotFoundException(String what, Long id) {
        super(what + " object with ID " + id + " was not found");
    }
}
