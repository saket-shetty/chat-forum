package com.example.chatserver.Interface;

import com.example.chatserver.Structure.Private.PrivateDataStructure;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoInterfacePrivate extends MongoRepository<PrivateDataStructure, String> {
}
