package com.likhith.gocity.service;

import com.likhith.gocity.dto.LoginRequest;
import com.likhith.gocity.dto.RegisterRequest;
import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.exception.ApiException;
import com.likhith.gocity.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public Profile register(RegisterRequest request) {
        profileRepository.findByEmail(request.getEmail()).ifPresent(p -> {
            throw new ApiException("An account with this email already exists");
        });

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new ApiException("Password must be at least 6 characters");
        }

        Profile profile = new Profile();
        profile.setFullName(request.getFullName());
        profile.setEmail(request.getEmail());
        profile.setPassword(passwordEncoder.encode(request.getPassword()));
        profile.setPhoneNumber(request.getPhoneNumber());

        return profileRepository.save(profile);
    }

    public Profile login(LoginRequest request){
        Profile profile=profileRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new ApiException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(),profile.getPassword())){
            throw new ApiException("Invalid password");
        }
        return profile;
    }
}
