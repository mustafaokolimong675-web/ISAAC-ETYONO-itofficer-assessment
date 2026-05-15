package com.enterprise.template.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private Long id;
    
    @NotBlank(message = "Fullname is required")
    private String fullname;
    
    @Email(message = "Invalid email format")
    private String email;
    
    private String department;
    
    @NotBlank(message = "Issue title is required")
    private String issueTitle;
    
    private String issueDescription;
    private String priority;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
