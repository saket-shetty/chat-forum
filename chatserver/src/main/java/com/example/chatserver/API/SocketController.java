package com.example.chatserver.API;

import com.example.chatserver.Structure.MessageObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {
    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageObject Socket(@Payload MessageObject data){
        return data;
    }

    @MessageMapping("/user-private")
    @SendTo("/topic/private")
    public PrivateDataObject Socket(@Payload PrivateDataObject data){
        return data;
    }
}

class PrivateDataObject{
    String roomid;
    String name;
    String message;
    PrivateDataObject(@JsonProperty("roomid") String roomid,
                      @JsonProperty("name") String name, @JsonProperty("message") String message){
        this.roomid = roomid;
        this.name = name;
        this.message = message;
    }
    public String getRoomid(){return roomid;}
    public String getName(){return name;}
    public String getMessage(){return message;}
}
