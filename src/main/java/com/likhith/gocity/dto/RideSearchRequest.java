package com.likhith.gocity.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RideSearchRequest {
    private String source;
    private String destination;
    private LocalDate date;
}
