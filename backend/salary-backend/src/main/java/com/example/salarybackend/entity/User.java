package com.example.salarybackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên không được để trống")
    private String name;

    @Min(value = 18, message = "Tuổi phải từ 18 trở lên")
    private int age;

    @Positive(message = "Lương phải lớn hơn 0")
    private double salary;
}