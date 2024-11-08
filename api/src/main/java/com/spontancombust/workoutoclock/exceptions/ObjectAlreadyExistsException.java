package com.spontancombust.workoutoclock.exceptions;


public class ObjectAlreadyExistsException extends RuntimeException {
    public ObjectAlreadyExistsException(String what, Long id) {
        super(what + " object with the same ID " + id + " already exsits");
    }
}
