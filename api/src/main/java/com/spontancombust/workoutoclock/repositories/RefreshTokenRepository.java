package com.spontancombust.workoutoclock.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spontancombust.workoutoclock.model.RefreshToken;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenString(String token);

    List<RefreshToken> findByUserIdAndExpiredDateAfter(Long id, Date date);
}
