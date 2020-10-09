package com.example.chatserver.Structure.Global;

import com.example.chatserver.Structure.MessageObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "chatforum")
public class GlobalDataStructure {
    @Id
    String roomid;
    List<MessageObject> list;

    public GlobalDataStructure(@JsonProperty("roomid") String roomid, @JsonProperty("Data") List<MessageObject> list){
        this.roomid = roomid;
        this.list = list;
    }

    public String getRoomid(){
        return roomid;
    }

    public List<MessageObject> getList(){
        return list;
    }

    public void setList(MessageObject data){
        list.add(data);
    }
}
