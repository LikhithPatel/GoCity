package com.likhith.gocity.service;

import com.likhith.gocity.dto.ReviewRequest;
import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.entity.Review;
import com.likhith.gocity.entity.Ride;
import com.likhith.gocity.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final RideService rideService;
    private final ProfileService profileService;

    public Review addReview(ReviewRequest request) {
        Ride ride = rideService.getRideById(request.getRideId());
        Profile reviewer = profileService.getProfileById(request.getReviewerId());
        Profile reviewee = profileService.getProfileById(request.getRevieweeId());

        Review review = new Review();
        review.setRide(ride);
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review saved = reviewRepository.save(review);

        List<Review> allReviews = reviewRepository.findByRevieweeIdOrderByCreatedAtDesc(reviewee.getId());
        double avg = allReviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        profileService.recalculateRating(reviewee.getId(), Math.round(avg * 10.0) / 10.0, allReviews.size());

        return saved;
    }

    public List<Review> getReviewsForProfile(Long profileId) {
        return reviewRepository.findByRevieweeIdOrderByCreatedAtDesc(profileId);
    }
}
