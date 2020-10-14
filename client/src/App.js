import React from 'react';
import Global from './pages/globalchat';
import Homepage from './pages/homepage';
import CreateRoom from './pages/createroom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends React.Component {
  
  componentDidMount(){
    axios.get("https://server-chatforum.herokuapp.com/api/global/").then(req=>{
      console.log(req.data);
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/global" component={Global} />
            <Route exact path='/create' component={CreateRoom} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;