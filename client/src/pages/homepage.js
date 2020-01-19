import React from 'react';
import './main.css'

class Homepage extends React.Component {
    render() {
        return (
            <div className="maindiv">
                <center>
                    <ul>
                        <li>
                            <a href="https://chatforum.herokuapp.com/global">
                                <div style={{ width: "250px", height: "350px", backgroundColor: "#2e2e2e" }}>
                                    <p style={{ paddingTop: "10px", fontSize: "22px" }}>Global Room</p>
                                    <p></p>
                                    <img src="https://www.freeiconspng.com/uploads/global-icon-13.png"
                                        style={{ width: "200px", height: "200px", backgroundColor: "#2e2e2e", color: "#ffffff" }}
                                    />
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="https://chatforum.herokuapp.com/create">
                                <div style={{ width: "250px", height: "350px", backgroundColor: "#2e2e2e" }}>
                                    <p style={{ paddingTop: "10px", fontSize: "22px"}}>Create / Join Room</p>
                                    <p></p>
                                    <img src="https://cdn3.iconfinder.com/data/icons/most-useful-icons-5/154/Most_Useful_icons_Mono_Blue_Background-36-512.png"
                                        style={{ width: "200px", height: "200px", backgroundColor: "#2e2e2e" }}
                                    />
                                </div>
                            </a>
                        </li>

                    </ul>
                </center>
            </div>
        );
    }
}

export default Homepage;