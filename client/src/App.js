import React from 'react';
import Global from './pages/globalchat';
import Homepage from './pages/homepage';
import CreateRoom from './pages/createroom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends React.Component {
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