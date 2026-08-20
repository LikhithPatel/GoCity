package com.likhith.gocity.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long rideId;
    private Long reviewerId;
    private Long revieweeId;
    private Integer rating;
    private String comment;
}
