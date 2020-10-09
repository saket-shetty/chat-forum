package com.example.chatserver.Structure;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MessageObject {
    String name;
    String message;

    public MessageObject(@JsonProperty("name") String name, @JsonProperty("message") String message){
        this.name = name;
        this.message = message;
    }

    public String getName(){
        return name;
    }

    public String getMessage(){
        return message;
    }
}
