package com.likhith.gocity.controller;

import com.likhith.gocity.dto.RideSearchRequest;
import com.likhith.gocity.entity.Ride;
import com.likhith.gocity.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {
    private final RideService rideService;

    @PostMapping("/driver/{driverId}/vehicle/{vehicleId}")
    public ResponseEntity<Ride> postRide(@PathVariable Long driverId, @PathVariable Long vehicleId, @RequestBody Ride ride){
        return ResponseEntity.ok(rideService.postRide(driverId, vehicleId, ride));
    }

    @PostMapping("/search")
    public ResponseEntity<List<Ride>> searchRide(@RequestBody RideSearchRequest  rideSearchRequest){
        return ResponseEntity.ok(rideService.searchRides(rideSearchRequest));
    }

    @GetMapping
    public ResponseEntity<List<Ride>> getAllScheduledRides(){
        return ResponseEntity.ok(rideService.getAllScheduledRides());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ride> getRideById(@PathVariable Long id){
        return ResponseEntity.ok(rideService.getRideById(id));
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Ride>> getRidesByDriverId(@PathVariable Long driverId) {
        return ResponseEntity.ok(rideService.getRidesByDriverId(driverId));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Ride> cancelRide(@PathVariable Long id){
        return ResponseEntity.ok(rideService.cancelRide(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ride> updateStatus(@PathVariable Long id, @RequestBody Ride.RideStatus rideStatus){
        return ResponseEntity.ok(rideService.updateRideStatus(id, rideStatus));
    }

}
