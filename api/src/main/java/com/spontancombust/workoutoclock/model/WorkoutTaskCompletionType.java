package com.spontancombust.workoutoclock.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum WorkoutTaskCompletionType {
    REPS("R"), TIME("T");


    private String code;

    private WorkoutTaskCompletionType(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}

@Converter(autoApply = true)
class WorkoutTaskCompletionTypeConverter implements AttributeConverter<WorkoutTaskCompletionType, String> {
    @Override
    public String convertToDatabaseColumn(WorkoutTaskCompletionType typ) {
        if (typ == null) {
            return null;
        }

        return typ.getCode();
    }

    @Override
    public WorkoutTaskCompletionType convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        switch (code) {
            case "R":
                return WorkoutTaskCompletionType.REPS;
            case "T":
                return WorkoutTaskCompletionType.TIME;
            default:
                throw new IllegalArgumentException("Unknown completion type code");
        }
    }

}