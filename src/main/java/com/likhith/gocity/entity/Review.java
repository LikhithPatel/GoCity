package com.likhith.gocity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="ride_id", nullable=false)
    private Ride ride;

    @ManyToOne
    @JoinColumn(name="reviewer_id", nullable=false)
    private Profile reviewer;

    @ManyToOne
    @JoinColumn(name="reviewee_id",nullable=false)
    private Profile reviewee;

    @Column(nullable = false)
    private Integer rating;

    private String comment;

    private LocalDateTime createdAt=LocalDateTime.now();
}
