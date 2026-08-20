package com.likhith.gocity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="vehicles")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vehicle {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="profile_id", nullable=false)
    private Profile owner;

    private String make;
    private String model;
    private String plateNumber;
    private String totalSeats;
    private String vehicleType;
}
