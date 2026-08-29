package com.likhith.gocity.controller;

import com.likhith.gocity.dto.BookingRequest;
import com.likhith.gocity.entity.Booking;
import com.likhith.gocity.service.BookingService;
import jakarta.validation.constraints.DecimalMax;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest){
        return ResponseEntity.ok(bookingService.createBooking(bookingRequest));
    }

    @GetMapping("/passenger/{passengerId}")
    public ResponseEntity<List<Booking>> getBookingsByPassenger(@PathVariable Long passengerId){
        return ResponseEntity.ok(bookingService.getBookingsByPassenger(passengerId));
    }

    @GetMapping("/ride/{rideId}")
    public ResponseEntity<List<Booking>> getBookingsForRide(@PathVariable Long rideId){
        return ResponseEntity.ok(bookingService.getBookingsForRide(rideId));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

}
