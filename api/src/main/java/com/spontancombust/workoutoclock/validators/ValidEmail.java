package com.spontancombust.workoutoclock.validators;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.regex.Pattern;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import lombok.NoArgsConstructor;


@Constraint(validatedBy = ValidEmail.EmailValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEmail {
    String message() default "Invalid e-mail address";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};


    @NoArgsConstructor
    public static class EmailValidator implements ConstraintValidator<ValidEmail, String> {
        private static final String REGEX = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
        private final Pattern pattern = Pattern.compile(REGEX);
    
        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            // allow nulls so that it doesn't take away the responsibility of @NotNull
            if (value == null) {
                return true;
            } else if (value.isEmpty()) {
                return false;
            }
    
            return this.pattern.matcher(value).matches();
        }
    }
}

