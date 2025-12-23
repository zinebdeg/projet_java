package com.eventmanagement.user.dto;

import com.eventmanagement.user.model.Role;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    private Role role;

    public UserDTO() {}

    public UserDTO(Long id, String username, String email, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}