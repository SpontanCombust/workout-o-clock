package com.spontancombust.workoutoclock.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workout_set_gen")
    @SequenceGenerator(name = "workout_set_gen", sequenceName = "workout_set_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_id")
    @NotNull
    private Long userId;

    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(name = "title", length = 64)
    private String title;

    @Column(name = "card_color_hex", length = 8)
    private String cardColorHex;
}
