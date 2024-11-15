package com.spontancombust.workoutoclock.exceptions;

public class EmailTakenException extends RuntimeException {
    public EmailTakenException() {
        super("This e-mail address is already associated with an existing user");
    }
}
