package com.likhith.gocity.service;

import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.exception.ApiException;
import com.likhith.gocity.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;

    public Profile createProfile(Profile profile) {
        profileRepository.findByEmail(profile.getEmail()).ifPresent(p -> {
            throw new ApiException("Profile with this email already exists");
        });
        return profileRepository.save(profile);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfileById(Long id){
        return profileRepository.findById(id).orElseThrow(()->new ApiException("Profile not found with id: "+id));
    }

    public Profile updateProfile(Long id, Profile updated) {
        Profile existing=getProfileById(id);
        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPhoneNumber(updated.getPhoneNumber());
        existing.setGender(updated.getGender());
        existing.setBio(updated.getBio());
        existing.setProfilePicUrl(updated.getProfilePicUrl());
        existing.setCity(updated.getCity());
        return profileRepository.save(existing);
    }

    public void deleteProfile(Long id){
        Profile existing=getProfileById(id);
        profileRepository.delete(existing);
    }

    public void recalculateRating(Long profileId, double newAvg, int totalRides){
        Profile profile=getProfileById(profileId);
        profile.setRatingAverage(newAvg);
        profile.setTotalRides(totalRides);
        profileRepository.save(profile);
    }
}
