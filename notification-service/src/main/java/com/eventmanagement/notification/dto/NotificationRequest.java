package com.eventmanagement.notification.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class NotificationRequest {
    @NotBlank
    @Email
    private String email;
    
    private String phoneNumber;
    
    @NotBlank
    private String subject;
    
    @NotBlank
    private String message;
    
    private NotificationType type = NotificationType.EMAIL;

    public NotificationRequest() {}

    public NotificationRequest(String email, String phoneNumber, String subject, String message, NotificationType type) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.subject = subject;
        this.message = message;
        this.type = type;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }
}






