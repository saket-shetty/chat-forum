import React from 'react';
import axios from 'axios';
import '../FormStyle.css';
import SockJsClient from 'react-stomp';

let url = "https://server-chatforum.herokuapp.com/";

class globalchat extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      value: [],
      allData:[],
      name: "",
      message: "",
      backgroundcolor: "#ffffff",
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  getData = () => {
    axios.get(url+'api/global/')
      .then(res => {
        var data = res.data;
        console.log(data)
        this.setState({ allData: data['Data'] });
        var obj = document.getElementById("cboard");
        obj.scrollTop = obj.scrollHeight;
      })
  }

  componentDidMount() {
    this.getData();
  }

  sendMessage = () => {
      this.clientRef.sendMessage('/app/user-all', JSON.stringify({
          name: this.state.name === "" ? "anon" : this.state.name,
          message: this.state.message
      }));
      axios.post(url+'api/global/',{
          roomid:"Global",
          Data:[
            {
              name: this.state.name === "" ? "anon" : this.state.name,
              message: this.state.message,
            }
          ]
      });
      this.setState({ message: "" });
  };

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div>
        <div id="cboard" className="chatboard" style={{ overflow: "auto", color: "black" }}>
          {this.state.allData.map(ids => (
              <div className="container" key={ids._id}>
                {ids.name}: {ids.message}
              </div>
            ))}
          {this.state.value.map(ids => (
            <div className="container" key={ids._id}>
              {ids.name}: {ids.message}
            </div>
          ))}
        </div>


        <SockJsClient url='https://server-chatforum.herokuapp.com/websocket-chat/'
          topics={['/topic/user']}
          onConnect={() => {
              console.log("connected");
          }}
          onDisconnect={() => {
              console.log("Disconnected");
          }}
          onMessage={(msg) => {
              this.setState({ value: this.state.value.concat(msg) });
              var obj = document.getElementById("cboard");
              obj.scrollTop = obj.scrollHeight;
          }}
          ref={(client) => {
              this.clientRef = client
          }}/>


        <div style={{ height: "20vh" }}>
          <table style={{ position: "fixed", bottom: "0" }}>
            <tbody>
              <tr>
                <td style={{ width: "15vw" }}>
                  <input id="inputbox" autoFocus="true" type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
                </td>
                <td style={{ width: "70vw" }}>
                  <input id="inputbox" autoFocus="true" onKeyDown={this._handleKeyDown} type="text" placeholder="message" name="message" value={this.state.message} onChange={this.handleChange} />
                </td>
                <td>
                  <button className="buttons button1 submit" type="submit" onClick={this.sendMessage}>
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default globalchat;