package com.likhith.gocity.repository;

import com.likhith.gocity.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByRevieweeIdOrderByCreatedAtDesc(Long revieweeId);
}
