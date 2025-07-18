package com.email.SmartEmail.Service;

import com.email.SmartEmail.model.EmailContent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailService {

    private final WebClient webClient;
    @Value("${gemini.api.url}") private String geminiURL;
    @Value("${gemini.api.key}") private String geminiApi;

    public EmailService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }


    public String generateContent(EmailContent emailContent) {
        //build a prompt
        String prompt=buildPrompt(emailContent);
        //Craft a requestBody
        Map<String,Object> requestBody= Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text",prompt)
                                })
                      }
                );
        //Do api call in server
        String fullUrl = geminiURL + "?key=" + geminiApi;
        String response=webClient.post()
                .uri(fullUrl)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //Extract gemini response
        return  extractResponse(response);
    }

    private String extractResponse(String response)  {

        JsonNode rootNode= null;
        try {
            ObjectMapper mapper=new ObjectMapper();
            rootNode = mapper.readTree(response);
        } catch (Exception e) {
           return "ERROR :"+e.getMessage();
        }
        return rootNode.path("candidates").get(0).path("content")
                .path("parts")
                .get(0).path("text").asText();
    }

    private String buildPrompt(EmailContent emailContent)
    {
        String prompt = "You are an AI email assistant. ";
        prompt += "Reply to the following email professionally";

// Add tone if provided
        if (emailContent.getTone() != null && !emailContent.getTone().isEmpty()) {
            prompt += " using a " + emailContent.getTone().toLowerCase() + " tone";
        }
        prompt += ". ";

        if (emailContent.getKeywords() != null && !emailContent.getKeywords().isEmpty()) {
            prompt += "Make sure to include the following key points or ideas: " + emailContent.getKeywords() + ". ";
        }
        prompt += "Only output the email reply. Do not explain or introduce your response. ";
        prompt += "If necessary,use placeholders wherever required.Use proper and relevant format for the response as per the tone";
        prompt += "Here is the email you are replying to:\n";
        prompt += emailContent.getContent();

        return prompt;
    }

//    private String buildPrompt(EmailContent emailContent) {
//        String prompt = "Generate a professional email reply for the following email content" +
//                ".Please don't generate a subject line.Just give the reply";
//
//        if (emailContent.getTone() != null && !emailContent.getTone().isEmpty()) {
//            prompt += "Use a " + emailContent.getTone() + " tone. ";
//        }
//        if(emailContent.getKeywords()!=null && !emailContent.getKeywords().isEmpty()){
//            prompt+= "For framing what kind of reponse u have to render,consider these keywords:" +emailContent.getKeywords();
//        }
//
//        prompt +="\nOriginal email:"+emailContent.getContent();
//        return prompt;
//    }
}
