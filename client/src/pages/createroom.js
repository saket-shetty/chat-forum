import React from 'react';
import axios from 'axios';
import '../FormStyle.css';
import SockJsClient from 'react-stomp';

let url = "https://server-chatforum.herokuapp.com/api/private/"

class createroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomid: "",
      submitRoomid: "",
      value: [],
      allData: [],
      name: "",
      message: "",
      backgroundcolor: "#ffffff",
    }
  }

  roomidset = (event) => {
    this.setState({ roomid: event.target.value })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitRoom = () => {
    this.setState({
      submitRoomid: this.state.roomid
    })
    this.getData()
  }

  getData = () => {
    axios.get(url)
      .then(res => {
        var data = res.data;
        if (data['data'][this.state.roomid] !== undefined) {
          this.setState({
            allData: data['data'][this.state.roomid]
          })
        }
        var obj = document.getElementById("cboard");
        obj.scrollTop = obj.scrollHeight;
      })
  }

  submit = () => {
    this.clientRef.sendMessage('/app/user-private', JSON.stringify({
      roomid: this.state.roomid,
      name: this.state.name === "" ? "anon" : this.state.name,
      message: this.state.message
    }));

    var path = url + this.state.roomid + "/";
    axios.post(path, {
      name: this.state.name === "" ? "anon" : this.state.name,
      message: this.state.message
    })
    this.setState({ message: "" });
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  render() {
    return (
      <div>
        {this.state.submitRoomid.length < 10
          ? (
            <center>
              <div>
                <p style={{ color: "#2e2e2e" }}>Room id should be more than 9 character</p>
                <input type="text" placeholder="Enter Room id" value={this.state.roomid} onChange={this.roomidset} />
                <button onClick={this.submitRoom} style={{ width: "100px" }}> submit </button>
              </div>
            </center>
          )
          :
          (
            <div style={{ backgroundColor: this.state.backgroundcolor }}>
              Room id: {this.state.submitRoomid}
              <div>
                <div style={{ height: "5vh" }}>
                  <center>
                    <h2>
                      Private Room
                    </h2>
                  </center>
                </div>

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
                  topics={['/topic/private']}
                  onConnect={() => {
                    console.log("connected");
                  }}
                  onDisconnect={() => {
                    console.log("Disconnected");
                  }}
                  onMessage={(msg) => {
                    if (msg.roomid === this.state.roomid) {
                      this.setState({ value: this.state.value.concat(msg) });
                      var obj = document.getElementById("cboard");
                      obj.scrollTop = obj.scrollHeight;
                    }
                  }}
                  ref={(client) => {
                    this.clientRef = client
                  }} />


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
                          <button className="buttons button1 submit" type="submit" onClick={() => this.submit()}>
                            Submit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default createroom