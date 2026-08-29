package com.likhith.gocity.controller;

import com.likhith.gocity.entity.Vehicle;
import com.likhith.gocity.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    @PostMapping("/owner/{ownerId}")
    public ResponseEntity<Vehicle> addVehicle(@PathVariable Long ownerId, @RequestBody Vehicle vehicle){
        return  ResponseEntity.ok(vehicleService.addVehicle(ownerId, vehicle));
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByOwner(@PathVariable Long ownerId){
        return ResponseEntity.ok(vehicleService.getVehiclesByOwner(ownerId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id){
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

}
