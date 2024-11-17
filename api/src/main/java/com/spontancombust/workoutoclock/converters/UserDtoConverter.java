package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.common.UserDto;
import com.spontancombust.workoutoclock.model.User;


public class UserDtoConverter implements DtoConverter<User, UserDto> {

    @Override
    public UserDto fromModel(User model) {
        return new UserDto(
            model.getId(), 
            model.getUsername(), 
            model.getEmail(), 
            model.getCreatedDate(), 
            model.getModifiedDate()
        );
    }
    
}
