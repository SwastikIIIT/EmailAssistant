package com.email.SmartEmail.Controller;

import com.email.SmartEmail.Service.EmailService;
import com.email.SmartEmail.model.EmailContent;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/email")
public class EmailController {

     @Autowired private  EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateReply(@RequestBody EmailContent emailContent)
    {
        String response=emailService.generateContent(emailContent);
        return ResponseEntity.ok(response);
    }
}
