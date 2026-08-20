package com.likhith.gocity.repository;

import com.likhith.gocity.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride,Long> {
    List<Ride> findByDriverIdOrderByDepartureTimeDesc(Long driverId);

    @Query("SELECT r FROM Ride r WHERE " +
            "LOWER(r.sourceCity) = LOWER(:source) AND " +
            "LOWER(r.destinationCity) = LOWER(:destination) AND " +
            "r.departureTime >= :fromDate AND r.departureTime < :toDate AND " +
            "r.availableSeats > 0 AND r.status = 'SCHEDULED' " +
            "ORDER BY r.departureTime ASC")
    List<Ride> searchRides(@Param("source") String source,
                           @Param("destination") String destination,
                           @Param("fromDate") LocalDateTime fromDate,
                           @Param("toDate") LocalDateTime toDate);

    List<Ride> findByStatusOrderByDepartureTimeAsc(Ride.RideStatus status);
}
