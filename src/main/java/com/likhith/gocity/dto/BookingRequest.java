package com.likhith.gocity.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private Long rideId;
    private Long passengerId;
    private Integer seatsBooked;
}
