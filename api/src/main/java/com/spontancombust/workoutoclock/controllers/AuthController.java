package com.spontancombust.workoutoclock.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spontancombust.workoutoclock.converters.Converters;
import com.spontancombust.workoutoclock.dto.SignInRequestDto;
import com.spontancombust.workoutoclock.dto.SignInResponseDto;
import com.spontancombust.workoutoclock.dto.SignUpRequestDto;
import com.spontancombust.workoutoclock.dto.UserDto;
import com.spontancombust.workoutoclock.services.AuthService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<SignInResponseDto> signIn(@RequestBody SignInRequestDto req) {
        var token = authService.signIn(req.getEmail(), req.getPassword());
        var responseDto = new SignInResponseDto(token);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signUp(@RequestBody SignUpRequestDto req) {
        var user = authService.signUp(req.getEmail(), req.getPassword(), req.getUsername());
        var userDto = Converters.userDto.fromModel(user);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/")
    public ResponseEntity<UserDto> getSignedInUser() {
        var user = authService.getSignedInUser();
        var userDto = Converters.userDto.fromModel(user);
        return ResponseEntity.ok(userDto);
    }
}
