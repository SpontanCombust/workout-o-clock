package com.spontancombust.workoutoclock.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @GeneratedValue
    @Column(name = "task_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    @NotNull
    private WorkoutSet set;

    @Column(name = "title", length = 64)
    private String title;

    @Column(name = "completion_type")
    private WorkoutTaskCompletionType completionType;

    @Column(name = "completion_value")
    private Integer completionValue;

    @Column(name = "card_color_hex", length = 8)
    private String cardColorHex;
}
