package com.example.chatserver.Interface;

import com.example.chatserver.Structure.Global.GlobalDataStructure;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoInterface extends MongoRepository<GlobalDataStructure, String> {

}
