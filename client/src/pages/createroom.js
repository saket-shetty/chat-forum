import React from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import '../FormStyle.css';


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
        this.socketdataget();
    }

    socketdataget(){
        console.log(String(this.state.roomid))
        const socket = socketIOClient("wss://chatforum-server.herokuapp.com");
            socket.on(String(this.state.roomid), (msg) => {
                this.setState({ value: this.state.value.concat(msg) });
                var obj = document.getElementById("cboard");
                obj.scrollTop = obj.scrollHeight;
        });
    }

    submit = () => {
        if (this.state.name === "") {
            const response = axios.post('https://chatforum-server.herokuapp.com/api/postCreateData', {
                name: "anon",
                message: this.state.message,
                roomid: this.state.submitRoomid,
            })
        }
        else {
            const response = axios.post('https://chatforum-server.herokuapp.com/api/postCreateData', {
                name: this.state.name,
                message: this.state.message,
                roomid: this.state.submitRoomid,
            })
        }
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

                                <p style={{color: "#2e2e2e"}}>Room id should be more than 9 character</p>
                                <input type="text" placeholder="Enter Room id" value={this.state.roomid} onChange={this.roomidset} />
                                <button onClick={this.submitRoom} style={{width: "100px"}}> submit </button>
                            </div>
                            </center>
                        )
                        :
                        (
                            <div>
                                Room id: {this.state.submitRoomid}
                                <div>
                                    <div style={{ height: "5vh" }}>
                                    <center>
                                        <h2>
                                            Private Room
                                        </h2>
                                    </center>
                                    </div>

                                    <div id="cboard" className="chatboard" style={{ overflow: "auto", color: "green"}}>

                                    {this.state.allData.map(newid =>(
                                        <div key={newid._id} style={{ fontSize: "20px" }}>
                                            {newid.name}>> {newid.message}
                                        </div>
                                    ))}

                                    {this.state.value.map(ids => (
                                        <div key={ids._id} style={{ fontSize: "20px" }}>
                                        {ids.name}>> {ids.message}
                                        </div>
                                    ))}
                                    </div>

                                    <div style={{ position: "fixed", bottom: "0", paddingBottom: "10px" }} onSubmit={() => this.submit()}>
                                    <input style={{ width: "15vw" }} autoFocus="true" type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
                                    <input style={{ width: "55vw" }} autoFocus="true" onKeyDown={this._handleKeyDown} type="text" placeholder="message" name="message" value={this.state.message} onChange={this.handleChange} />
                                    <button type="submit" onClick={() => this.submit()}>
                                        Submit
                                    </button>
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