package com.likhith.gocity.controller;

import com.likhith.gocity.dto.ReviewRequest;
import com.likhith.gocity.entity.Review;
import com.likhith.gocity.repository.ReviewRepository;
import com.likhith.gocity.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequest reviewRequest){
        return ResponseEntity.ok().body(reviewService.addReview(reviewRequest));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<Review>> getReviewsForProfile(@PathVariable Long profileId) {
        return ResponseEntity.ok(reviewService.getReviewsForProfile(profileId));
    }
}
