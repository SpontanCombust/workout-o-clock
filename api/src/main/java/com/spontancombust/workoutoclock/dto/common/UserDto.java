package com.spontancombust.workoutoclock.dto.common;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.spontancombust.workoutoclock.validators.ValidEmail;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;

    private String username;

    @ValidEmail
    private String email;

    private Date createdDate;

    private Date modifiedDate;
    
}
