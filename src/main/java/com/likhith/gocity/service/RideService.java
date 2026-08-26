package com.likhith.gocity.service;

import com.likhith.gocity.dto.RideSearchRequest;
import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.entity.Ride;
import com.likhith.gocity.entity.Vehicle;
import com.likhith.gocity.exception.ApiException;
import com.likhith.gocity.repository.RideRepository;
import com.likhith.gocity.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final ProfileService profileService;
    private final VehicleRepository vehicleRepository;

    public Ride postRide(Long driverId, Long vehicleId, Ride ride) {
        Profile driver = profileService.getProfileById(driverId);
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ApiException("Vehicle not found"));

        if (ride.getTotalSeats() > vehicle.getTotalSeats()) {
            throw new ApiException("Total seats offered cannot exceed vehicle capacity");
        }

        ride.setDriver(driver);
        ride.setVehicle(vehicle);
        ride.setAvailableSeats(ride.getTotalSeats());
        ride.setStatus(Ride.RideStatus.SCHEDULED);
        return rideRepository.save(ride);
    }

    public List<Ride> searchRides(RideSearchRequest request){
        LocalDateTime fromDate=request.getDate().atStartOfDay();
        LocalDateTime toDate=fromDate.plusDays(1);
        return rideRepository.searchRides(request.getSource(),request.getDestination(),fromDate,toDate);
    }

    public List<Ride> getAllScheduledRides(){
        return rideRepository.findByStatusOrderByDepartureTimeAsc(Ride.RideStatus.SCHEDULED);
    }

    public Ride getRideById(Long id){
        return rideRepository.findById(id)
                .orElseThrow(() -> new ApiException("Ride not found"));
    }

    public List<Ride> getRidesByDriverId(Long driverId){
        return rideRepository.findByDriverIdOrderByDepartureTimeDesc(driverId);
    }

    public Ride updateRideStatus(Long rideId, Ride.RideStatus status){
        Ride ride=getRideById(rideId);
        ride.setStatus(status);
        return rideRepository.save(ride);
    }

    public Ride cancelRide(Long rideId){
        Ride ride=getRideById(rideId);
        ride.setStatus(Ride.RideStatus.CANCELLED);
        return rideRepository.save(ride);
    }

    public void decrementSeats(Ride ride,int seats){
        if(ride.getAvailableSeats() < seats){
            throw new ApiException("Not enough seats available");
        }
        ride.setAvailableSeats(ride.getAvailableSeats()-seats);
        rideRepository.save(ride);
    }

    public void incrementSeats(Ride ride, int seats){
        ride.setAvailableSeats(ride.getAvailableSeats()+seats);
        rideRepository.save(ride);
    }
}
