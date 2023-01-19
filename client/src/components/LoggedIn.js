import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
const port = 5001;

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: ""
        };
    }
    componentDidMount() {
        
        console.log("Logging in?")
       console.log(window.localStorage.getItem("token"));
        axios.post("http://localhost:" + port + "/accounts/LoggedIn", { 
            body: {
                token: window.localStorage.getItem("token"),
            },
            })
        .then(res => {
            console.log(res.data);
            this.setState({ email: res.data })
            this.setState({ redirect: this.state.redirect === false });
        })
        .catch(err => { 
            if(err.request.status===409)
            {
                alert("An error occured while logging in "+err.request.status+" !")
            }
            else if(err.request.status===400)
            {
                alert("ERROR: "+err.request.status+" !")
            }
            console.log(err) 
        });
    }

    render() {
        return (
            <div>
                {/* <input type="text" className="form-control"  name="email" value={this.state.email} /> */}
                Hello <h1>{this.state.email}</h1>
            </div>
        );
    }

}

export default LoggedIn;