package com.spontancombust.workoutoclock.dto.common;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(use = Id.NAME, include = As.EXISTING_PROPERTY, property = "objectiveType", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = WorkoutTaskTimeObjectiveDto.class, name = "T"),
    @JsonSubTypes.Type(value = WorkoutTaskRepsObjectiveDto.class, name = "R")
})
public abstract class WorkoutTaskObjectiveDto {
    private String objectiveType;
}