package com.spontancombust.workoutoclock.converters;

public interface DtoConverter<M, D> {
    D fromModel(M model);
}
