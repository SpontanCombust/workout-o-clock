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
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@Entity
@Table(name = "workout_task")
public class WorkoutTask {
    @Id
    @Column(name = "task_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workout_task_gen")
    @SequenceGenerator(name = "workout_task_gen", sequenceName = "workout_task_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    @NotNull
    private WorkoutSet set;

    @Column(name = "title", length = 64)
    private String title;

    @Column(name = "objective_type", columnDefinition="BPCHAR(1)")
    private WorkoutTaskObjectiveType objectiveType;

    @Column(name = "objective_reps")
    private Integer objectiveReps;

    @Column(name = "objective_time_secs")
    private Integer objectiveTimeSecs;

    @Column(name = "card_color_hex", length = 8)
    private String cardColorHex;
}
