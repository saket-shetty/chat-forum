package com.example.chatserver.Structure.Private;

import com.example.chatserver.Structure.MessageObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "chatforumPrivate")
public class PrivateDataStructure {
    @Id
    String roomId;
    Map<String, List<MessageObject>> Data;

    public PrivateDataStructure(@JsonProperty("roomid") String roomId,
                                @JsonProperty("Data") Map<String, List<MessageObject>> Data){
        this.roomId = roomId;
        this.Data = Data;
    }

    public String getRoomId(){
        return roomId;
    }

    public Map<String, List<MessageObject>> getData(){
        return Data;
    }

    public void setMapDataList(String key, MessageObject data){
        this.Data.get(key).add(data);
    }
}
