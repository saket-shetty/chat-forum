package com.example.chatserver.DAO;

import com.example.chatserver.Interface.ChatforumInterface;
import com.example.chatserver.Interface.MongoInterface;
import com.example.chatserver.Interface.MongoInterfacePrivate;
import com.example.chatserver.Structure.Global.GlobalDataStructure;
import com.example.chatserver.Structure.MessageObject;
import com.example.chatserver.Structure.Private.PrivateDataStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.Collections;


@Repository("RealData")
public class MongoDataAccess implements ChatforumInterface {

    @Autowired
    public MongoInterface mongoInterface;

    @Autowired
    public MongoInterfacePrivate mongoInterfacePrivate;

    @Override
    public GlobalDataStructure getAllGlobalData() {
        return mongoInterface.findAll().get(0);
    }

    @Override
    public void postGlobalData(GlobalDataStructure data) {
        GlobalDataStructure retrieveData = getAllGlobalData();
        if(retrieveData.getList().size()==0)
            mongoInterface.save(data);
        else{
            if(retrieveData.getList().size()>20)
                retrieveData.getList().remove(0);
            retrieveData.setList(data.getList().get(0));
            mongoInterface.save(retrieveData);
        }
    }

    @Override
    public void deleteAllData() {
        mongoInterface.deleteAll();
    }

    @Override
    public PrivateDataStructure getAllPrivateData() {
        return mongoInterfacePrivate.findAll().get(0);
    }

    @Override
    public void PostPrivateData(PrivateDataStructure data) {
        PrivateDataStructure privateData = getAllPrivateData();
        for(String key: data.getData().keySet()){
            if(privateData.getData().containsKey(key)){
                privateData.setMapDataList(key, data.getData().get(key).get(0));
            }else{
                privateData.getData().put(key, data.getData().get(key));
            }
            mongoInterfacePrivate.save(privateData);
        }
    }

    @Override
    public void PostDataToPrivateRoom(String key, MessageObject data) {
        PrivateDataStructure privateData = getAllPrivateData();
        if(privateData.getData().containsKey(key)){
            privateData.setMapDataList(key, data);
        }else{
            privateData.getData().put(key, Collections.singletonList(data));
        }
        mongoInterfacePrivate.save(privateData);
    }
}
