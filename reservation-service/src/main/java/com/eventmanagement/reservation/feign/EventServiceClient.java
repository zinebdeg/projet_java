package com.eventmanagement.reservation.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "event-service")
public interface EventServiceClient {
    @GetMapping("/events/{id}")
    EventDTO getEventById(@PathVariable("id") Long id);
}






