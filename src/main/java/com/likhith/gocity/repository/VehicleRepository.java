package com.likhith.gocity.repository;

import com.likhith.gocity.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
    List<Vehicle> findByOwnerId(Long OwnerId);
}
