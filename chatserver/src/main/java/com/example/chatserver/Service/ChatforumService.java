package com.example.chatserver.Service;

import com.example.chatserver.Interface.ChatforumInterface;
import com.example.chatserver.Structure.Global.GlobalDataStructure;
import com.example.chatserver.Structure.MessageObject;
import com.example.chatserver.Structure.Private.PrivateDataStructure;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatforumService {

    public ChatforumInterface chatforumInterface;

    public ChatforumService(@Qualifier("RealData") ChatforumInterface chatforumInterface){
        this.chatforumInterface = chatforumInterface;
    }

    public GlobalDataStructure getGlobalData(){
        return chatforumInterface.getAllGlobalData();
    }

    public void postGlobalData(GlobalDataStructure data){
        chatforumInterface.postGlobalData(data);
    }

    public void deleteAllData(){
        chatforumInterface.deleteAllData();
    }

    public PrivateDataStructure GetAllPrivateData(){
        return chatforumInterface.getAllPrivateData();
    }

    public void PostPrivateData(PrivateDataStructure data){
        chatforumInterface.PostPrivateData(data);
    }

    public void PostDataToRoom(String key, MessageObject data){
        chatforumInterface.PostDataToPrivateRoom(key,data);
    }
}
