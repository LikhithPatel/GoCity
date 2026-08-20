package com.likhith.gocity.repository;

import com.likhith.gocity.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByRideId(Long rideId);
    List<Booking> findByPassengerIdOrderByBookedAtDesc(Long passengerId);

}
