package com.spontancombust.workoutoclock.exceptions;

public class ObjectNotFoundException extends RuntimeException {
    public ObjectNotFoundException(String what) {
        super(what + " object was not found");
    }
}
