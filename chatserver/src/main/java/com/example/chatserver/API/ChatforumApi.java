package com.example.chatserver.API;

import com.example.chatserver.Service.ChatforumService;
import com.example.chatserver.Structure.Global.GlobalDataStructure;
import com.example.chatserver.Structure.MessageObject;
import com.example.chatserver.Structure.Private.PrivateDataStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ChatforumApi {

    @Autowired
    public ChatforumService chatforumService;

    @Autowired
    public SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/global/")
    public GlobalDataStructure getData(){
        return chatforumService.getGlobalData();
    }

    @PostMapping("/global/")
    public void postData(@RequestBody GlobalDataStructure data){
        chatforumService.postGlobalData(data);
    }

    @DeleteMapping
    public void deleteAllData(){
        chatforumService.deleteAllData();
    }

    @GetMapping("/private/")
    public PrivateDataStructure GetPrivateData(){
        return chatforumService.GetAllPrivateData();
    }

    @PostMapping("/private/")
    public void PostPrivateData(@RequestBody PrivateDataStructure data){
        chatforumService.PostPrivateData(data);
    }

    @PostMapping("/private/{roomkey}/")
    public void PostDataToPrivateRoom(@PathVariable("roomkey") String key, @RequestBody MessageObject data){
        chatforumService.PostDataToRoom(key,data);

    }
}
