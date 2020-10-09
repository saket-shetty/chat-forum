import React from 'react';
import '../FormStyle.css'
class Homepage extends React.Component {
    render() {
        return (
            <div>
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
                </head>
                <center>
                    <div className="homepagecard center">
                        <center><span id="title">Connect World</span></center>
                        <p>Connect World is an IRC chatroom where user can chat with other
                        global users on Internet or can create a Private Room and communicate with their group of friends privately.</p>
                        <p>Global: In Global you will be chatting with randoms people from the internet <span style={{color:"purple"}}>anonymously</span>.</p>
                        <p>Private: In Private you will be chatting with your friends by <span style={{color:"green"}}>Creating</span> a server or
                            <span style={{color:"green"}}> Joining</span> a server with server id and password</p>
                        <p>Start Chatting:</p>
                        <a href="/global"><button className="buttons button1">Global</button></a>
                        <a href="/create"><button className="buttons button1">Private</button></a>
                    </div>
                </center>
            </div>
        );
    }
}

export default Homepage;