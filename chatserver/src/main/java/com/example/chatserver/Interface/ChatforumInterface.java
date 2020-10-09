package com.example.chatserver.Interface;

import com.example.chatserver.Structure.Global.GlobalDataStructure;
import com.example.chatserver.Structure.MessageObject;
import com.example.chatserver.Structure.Private.PrivateDataStructure;

import java.util.*;

public interface ChatforumInterface {
    public GlobalDataStructure getAllGlobalData();
    public void postGlobalData(GlobalDataStructure data);
    public void deleteAllData();

    public PrivateDataStructure getAllPrivateData();
    public void PostPrivateData(PrivateDataStructure data);
    public void PostDataToPrivateRoom(String key, MessageObject data);
}
