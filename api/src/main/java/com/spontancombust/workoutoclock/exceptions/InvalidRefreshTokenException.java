package com.spontancombust.workoutoclock.exceptions;


public class InvalidRefreshTokenException extends RuntimeException {
    public InvalidRefreshTokenException() {
        super("Refresh token was invalid or has expired");
    }
}
