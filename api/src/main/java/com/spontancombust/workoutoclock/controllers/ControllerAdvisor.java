package com.spontancombust.workoutoclock.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import lombok.AllArgsConstructor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.spontancombust.workoutoclock.exceptions.EmailTakenException;
import com.spontancombust.workoutoclock.exceptions.InvalidRefreshTokenException;
import com.spontancombust.workoutoclock.exceptions.InvalidWorkoutTaskIndexException;
import com.spontancombust.workoutoclock.exceptions.ObjectAlreadyExistsException;
import com.spontancombust.workoutoclock.exceptions.ObjectNotFoundException;


@ControllerAdvice
@AllArgsConstructor
public class ControllerAdvisor {

    private final Environment env;


    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<Object> handleObjectNotFoundException(ObjectNotFoundException ex) {
        return new ResponseEntityBuilder(HttpStatus.NOT_FOUND)
                    .message(ex.getMessage())
                    .build();
    }

    @ExceptionHandler(ObjectAlreadyExistsException.class)
    public ResponseEntity<Object> handleObjectAlreadyExistsException(ObjectAlreadyExistsException ex) {
        return new ResponseEntityBuilder(HttpStatus.CONFLICT)
                    .message(ex.getMessage())
                    .build();
    }

    @ExceptionHandler(InvalidWorkoutTaskIndexException.class)
    public ResponseEntity<Object> handleInvalidWorkoutTaskIndexException(InvalidWorkoutTaskIndexException ex) {
        return new ResponseEntityBuilder(HttpStatus.BAD_REQUEST)
                    .message(ex.getMessage())
                    .build();
    }

    @ExceptionHandler(EmailTakenException.class)
    public ResponseEntity<Object> handleEmailTakenException(EmailTakenException ex) {
        return new ResponseEntityBuilder(HttpStatus.CONFLICT)
                    .message(ex.getMessage())
                    .build();
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        HashMap<String, Object> fieldErrors = new HashMap<>();
        for(var error: ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        return new ResponseEntityBuilder(HttpStatus.BAD_REQUEST)
                    .message("Data validation failed")
                    .field("fieldErrors", fieldErrors)
                    .build();
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<Object> handleJsonSerializationExceptions(JsonProcessingException ex) {
        return new ResponseEntityBuilder(HttpStatus.BAD_REQUEST)
                    .message(ex.getMessage())
                    .build();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredendialsException(BadCredentialsException ex) {
        return new ResponseEntityBuilder(HttpStatus.UNAUTHORIZED)
                    .message(ex.getMessage())
                    .build();
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<Object> handleRefreshTokenExpiredException(InvalidRefreshTokenException ex) {
        var b = new ResponseEntityBuilder(HttpStatus.FORBIDDEN);

        if (this.env.matchesProfiles("dev")) {
            b = b.message(ex.getMessage());
        }
                    
        return b.build();
    }



    // The most generic handler for everything that doesn't get caught
    // All more specific errors should be placed ABOVE this one
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        var b = new ResponseEntityBuilder(HttpStatus.INTERNAL_SERVER_ERROR)
                        .message("Unexpected server error");

        // obscure the true nature of an error outside of dev environment
        if (this.env.matchesProfiles("dev")) {
            b = b.field("exception", ex.getClass().getName())
                .field("error", ex.getMessage())        
                .field("stackTrace", ex.getStackTrace());
        }

        return b.build();
    }
}


class ResponseEntityBuilder {
    private HttpStatus status;
    private Map<String, Object> body;

    public ResponseEntityBuilder(HttpStatus status) {
        this.status = status;
        this.body = new HashMap<>();
    }


    public ResponseEntityBuilder field(String key, Object value) {
        this.body.put(key, value);
        return this;
    }

    public ResponseEntityBuilder message(String msg) {
        this.body.put("msg", msg);
        return this;
    }


    public ResponseEntity<Object> build() {
        return new ResponseEntity<>(
            this.body,
            this.status
        );
    }
}