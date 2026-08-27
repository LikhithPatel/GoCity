package com.likhith.gocity.service;

import com.likhith.gocity.dto.BookingRequest;
import com.likhith.gocity.entity.Booking;
import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.entity.Ride;
import com.likhith.gocity.exception.ApiException;
import com.likhith.gocity.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ProfileService profileService;
    private final RideService rideService;

    public Booking createBooking(BookingRequest request) {
        Ride ride = rideService.getRideById(request.getRideId());
        Profile passenger = profileService.getProfileById(request.getPassengerId());

        if (ride.getStatus() != Ride.RideStatus.SCHEDULED) {
            throw new ApiException("This ride is not open for booking");
        }
        if (ride.getDriver().getId().equals(passenger.getId())) {
            throw new ApiException("Driver cannot book their own ride");
        }

        rideService.decrementSeats(ride, request.getSeatsBooked());

        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setPassenger(passenger);
        booking.setSeatsBooked(request.getSeatsBooked());
        booking.setTotalPrice(ride.getPricePerSeat() * request.getSeatsBooked());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByPassenger(Long passengerId) {
        return bookingRepository.findByPassengerIdOrderByBookedAtDesc(passengerId);
    }

    public List<Booking> getBookingsForRide(Long rideId) {
        return bookingRepository.findByRideId(rideId);
    }

    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ApiException("Booking not found"));

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new ApiException("Booking already cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        rideService.incrementSeats(booking.getRide(), booking.getSeatsBooked());
        return bookingRepository.save(booking);
    }
}
