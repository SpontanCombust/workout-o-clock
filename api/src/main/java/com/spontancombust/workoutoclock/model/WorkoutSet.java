package com.spontancombust.workoutoclock.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Entity
@Table(name = "workout_set")
@Data
@Builder
@AllArgsConstructor
public class WorkoutSet {
    @Id
    @Column(name = "set_id")
    @GeneratedValue
    private Long id;

    @Column(name = "title", length = 64)
    private String title;

    @Column(name = "card_color_hex", length = 8)
    private String cardColorHex;
}
