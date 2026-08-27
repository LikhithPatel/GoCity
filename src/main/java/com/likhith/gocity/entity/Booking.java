package com.likhith.gocity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="ride_id", nullable=false)
    private Ride ride;

    @ManyToOne
    @JoinColumn(name="passenger_id", nullable=false)
    private Profile passenger;

    @Column(nullable=false)
    private Integer seatsBooked;

    @Column(nullable=false)
    private Double totalPrice;

    private LocalDateTime bookedAt=LocalDateTime.now();

    public enum BookingStatus{
        CONFIRMED,
        CANCELLED,
        COMPLETED
    }

    @Enumerated(EnumType.STRING)
    private BookingStatus status=BookingStatus.CONFIRMED;

}
