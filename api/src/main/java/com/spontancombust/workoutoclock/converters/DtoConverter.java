package com.spontancombust.workoutoclock.converters;

public interface DtoConverter<M, D> {
    M toModel(D dto);
    D fromModel(M model);
}
