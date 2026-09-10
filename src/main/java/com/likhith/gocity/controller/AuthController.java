package com.likhith.gocity.controller;

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
public class AuthController {
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public Profile Register(RegisterRequest request){
        profileRepository.findByEmail(request.getEmail()).ifPresent(p->{
            throw new ApiException("An account with this email already exists");
        });

        if(request.getPassword()==null || request.getPassword().length()<6){
            throw new ApiException("Password length less than 6 characters");
        }

        Profile profile=new Profile();
        profile.setEmail(request.getEmail());
        profile.setPassword(passwordEncoder.encode(request.getPassword()));
        profile.setFullName(request.getFullName());
        profile.setPhoneNumber(request.getPhoneNumber());

        return profileRepository.save(profile);
    }

    public Profile Login(LoginRequest request){
        Profile profile=profileRepository.findByEmail(request.getEmail()).orElseThrow(()->
                new ApiException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(),profile.getPassword())){
            throw new ApiException("Invalid email or password");
        }
        return profile;
    }
}
