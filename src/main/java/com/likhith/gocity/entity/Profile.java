package com.likhith.gocity.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable=false)
    private String fullName;

    @Email
    @Column(nullable=false,unique=true)
    private String email;

    @NotBlank
    @Column(nullable=false,unique=true)
    private String phoneNumber;

    private String gender;
    private String bio;
    private String profilePicUrl;
    private String city;

    @Column(nullable=false)
    private Double ratingAverage=0.0;

    private Boolean verified=false;

    private LocalDateTime createdAt=LocalDateTime.now();

}
