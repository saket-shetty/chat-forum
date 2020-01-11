const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoClient = require("mongodb").MongoClient;
var cors = require('cors');
var bodyParser = require('body-parser');

// our localhost port
const port = process.env.PORT || 4001;

const app = express()

const router = express.Router();

app.use(bodyParser())
app.use(cors());

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

var url = "mongodb+srv://saket:saket@cluster0-sqsjk.mongodb.net/test?retryWrites=true&w=majority";

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected');

  mongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){
    const db = client.db("chatapp");
    db.collection('chat').watch().on('change', msg=>{
      socket.emit('message', msg['fullDocument']);
    });
  });
})

router.post('/postData', (req, res)=>{
  console.log("postData");
  res.end(JSON.stringify(req.body))
  
  mongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){
    const db = client.db("chatapp");
    res.end(JSON.stringify(req.body))
    db.collection('chat').insertOne({
      name: req.body.name,
      message: req.body.message,
    });
  })
  console.log(req.body.name, req.body.message);
})

router.get('/allData', (req, res)=>{
  mongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){
    const db = client.db("chatapp");
    db.collection('chat').find().sort({"_id": -1}).limit(20).toArray(function (error, result) {
      if(error) throw error;
      return res.json({success: true, data: result});
    });
  })
})

app.use('/api', router);

server.listen(port, () => console.log(`Listening on port ${port}`))