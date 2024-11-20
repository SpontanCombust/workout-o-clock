package com.spontancombust.workoutoclock.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.NoArgsConstructor;


public enum WorkoutTaskObjectiveType {
    REPS("R"), TIME("T");


    private String code;

    private WorkoutTaskObjectiveType(String code) {
        this.code = code;
    }

    public static WorkoutTaskObjectiveType tryFromCode(String code) throws IllegalArgumentException {
        if (code == null) {
            return null;
        }

        for(WorkoutTaskObjectiveType type: WorkoutTaskObjectiveType.values()) {
            if (type.getCode().equals(code)) {
                return type;
            }
        }

        throw new IllegalArgumentException("Unknown completion type code");
    }

    public String getCode() {
        return this.code;
    }
}

@NoArgsConstructor
@Converter(autoApply = true)
class WorkoutTaskObjectiveTypeConverter implements AttributeConverter<WorkoutTaskObjectiveType, String> {
    @Override
    public String convertToDatabaseColumn(WorkoutTaskObjectiveType typ) {
        if (typ == null) {
            return null;
        }

        return typ.getCode();
    }

    @Override
    public WorkoutTaskObjectiveType convertToEntityAttribute(String code) {
        return WorkoutTaskObjectiveType.tryFromCode(code);
    }

}