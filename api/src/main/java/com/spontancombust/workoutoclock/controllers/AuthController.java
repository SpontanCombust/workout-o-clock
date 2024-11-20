package com.spontancombust.workoutoclock.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.spontancombust.workoutoclock.converters.Converters;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.ChangePasswordRequestDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.RefreshRequestDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.RefreshResponseDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.SignInRequestDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.SignInResponseDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.SignOutRequestDto;
import com.spontancombust.workoutoclock.dto.AuthControllerDtos.SignUpRequestDto;
import com.spontancombust.workoutoclock.dto.common.UserDto;
import com.spontancombust.workoutoclock.services.AuthService;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<SignInResponseDto> signIn(@Valid @RequestBody SignInRequestDto req) {
        var tokens = authService.signIn(req.getEmail(), req.getPassword());
        var responseDto = new SignInResponseDto(tokens.getAccessToken(), tokens.getRefreshToken());
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signUp(@Valid @RequestBody SignUpRequestDto req) {
        var user = authService.signUp(req.getEmail(), req.getPassword(), req.getUsername());
        var userDto = Converters.userDto.fromModel(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(@Valid @RequestBody RefreshRequestDto req) {
        var tokens = authService.refreshAuth(req.getRefreshToken());
        var responseDto = new RefreshResponseDto(tokens.getAccessToken(), tokens.getRefreshToken());
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> signOut(@Valid @RequestBody SignOutRequestDto req) {
        authService.signOut(req.getRefreshToken());
        return ResponseEntity.ok(null);
    }

    @PostMapping("/change-password")
    public ResponseEntity<UserDto> changePassword(@Valid @RequestBody ChangePasswordRequestDto req) {
        var user = authService.changePassword(req.getOldPassword(), req.getNewPassword());
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
