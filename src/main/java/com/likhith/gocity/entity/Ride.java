package com.likhith.gocity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="rides")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ride {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="driver_id", nullable=false)
    private Profile driver;

    @ManyToOne
    @JoinColumn(name="vehicle_id")
    private Vehicle vehicle;

    @Column(nullable=false)
    private String sourceCity;

    @Column(nullable=false)
    private String destinationCity;

    @Column(nullable=false)
    private LocalDateTime departureTIme;

    @Column(nullable=false)
    private Integer totalSeats;

    @Column(nullable=false)
    private Double pricePerSeat;

    private RideStatus status=RideStatus.SCHEDULED;

    private String notes;

    private Boolean instantBooking=true;

    private LocalDateTime createdAt=LocalDateTime.now();

    public enum RideStatus {
        SCHEDULED,
        ONGOING,
        COMPLETED,
        CANCELLED
    }
}
