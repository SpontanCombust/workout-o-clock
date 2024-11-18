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


@Constraint(validatedBy = ColorHexValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidColorHex {
    String message() default "Invalid color format, expected hexadecimal RGB or RGBA";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

class ColorHexValidator implements ConstraintValidator<ValidColorHex, String> {
    private static final String REGEX = "^(?:[0-9a-fA-F]{2}){3,4}$";
    private final Pattern pattern = Pattern.compile(REGEX);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        return this.pattern.matcher(value).matches();
    }
    
}
