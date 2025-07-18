package com.email.SmartEmail.model;

import lombok.Data;

@Data
public class EmailContent {
    private String content;
    private String tone;
    private String keywords;
}
