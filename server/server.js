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


  socket.emit('pressed', 'this value coming from nodejs finally ooh yeah');

  socket.on('value node', (msg)=>{
    console.log(msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

router.post('/postData', (req, res)=>{
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

app.use('/api', router);

// app.listen(port, () => console.log(`LISTENING ON PORT `));

server.listen(port, () => console.log(`Listening on port ${port}`))