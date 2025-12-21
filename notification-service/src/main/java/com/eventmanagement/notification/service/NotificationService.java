package com.eventmanagement.notification.service;

import com.eventmanagement.notification.dto.NotificationRequest;
import com.eventmanagement.notification.dto.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    
    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendNotification(NotificationRequest request) {
        if (request.getType() == NotificationType.EMAIL || request.getType() == NotificationType.BOTH) {
            sendEmail(request);
        }
        
        if (request.getType() == NotificationType.SMS || request.getType() == NotificationType.BOTH) {
            sendSMS(request);
        }
    }

    private void sendEmail(NotificationRequest request) {
        if (mailSender != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getEmail());
            message.setSubject(request.getSubject());
            message.setText(request.getMessage());
            mailSender.send(message);
        } else {
            // Log simulation pour la démo
            System.out.println("EMAIL SENT TO: " + request.getEmail());
            System.out.println("SUBJECT: " + request.getSubject());
            System.out.println("MESSAGE: " + request.getMessage());
        }
    }

    private void sendSMS(NotificationRequest request) {
        // Simulation d'envoi SMS
        System.out.println("SMS SENT TO: " + request.getPhoneNumber());
        System.out.println("MESSAGE: " + request.getMessage());
    }
}






