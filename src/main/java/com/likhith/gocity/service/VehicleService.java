package com.likhith.gocity.service;

import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.entity.Vehicle;
import com.likhith.gocity.exception.ApiException;
import com.likhith.gocity.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final ProfileService profileService;

    public Vehicle addVehicle(Long ownerId, Vehicle vehicle){
        Profile owner=profileService.getProfileById(ownerId);
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehiclesByOwner(Long ownerId){
        return vehicleRepository.findByOwnerId(ownerId);
    }

    public void deleteVehicle(Long id){
        Vehicle v=vehicleRepository.findById(id).orElseThrow(()->new ApiException("Vehicle not found"));
        vehicleRepository.delete(v);
    }
}
