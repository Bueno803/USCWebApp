import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

class SettingsUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            redirect: false
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    handleFirstNameChange(e) {
        this.setState({ first_name: e.target.value })
    }
    handleSecondNameChange(e) {
        this.setState({ last_name: e.target.value })
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    //todo make a call to the backend to update the user's settings (test below)
    updateUser(event) {
        event.preventDefault();
        const update = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,    
        }
        console.log(update);
        axios.put("http://localhost:5001/accounts/update", update)

            .then(res => {
                console.log(res);
                this.setState({ redirect: this.state.redirect === false });
            }
            )    
    }

    render() {
        return (

            <div>
                <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                  

                    <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{
                            width: "45%", height: "400px", backgroundColor: "gray",
                            borderRadius: "100px"
                        }}>
                             <h2 style={{ textAlign: "center", color: "white" }}>Change Settings</h2>
             
                            <div style={{ display: "flex", alignItems: "center", 
                            paddingLeft:"7%",
                               color: "white" }}>

                                <form onSubmit={this.addUser} method="user" 
                                style={{width:"100%",justifyContent: "center"}}>
                                    <div className="form-group row">
                                        <label style={{width:"300px"}}>First Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={this.handleFirstNameChange} name="first_name" value={this.state.first_name} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label style={{width:"200px"}}>Last Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={this.handleSecondNameChange} name="last_name" value={this.state.last_name} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label style={{width:"200px"}}>Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={this.handleEmailChange} name="email" value={this.state.email} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label style={{width:"200px"}}>Password</label>
                                        <div className="col-sm-10">
                                            <input type= "password" className="form-control" onChange={this.handlePasswordChange} name="password" value={this.state.password} />                                        </div>
                                    </div>
                                    <hr />
                                    <div style={{ width:"100%",textAlign:"center",display:"flex", alignItems:"center"  }} className="row" OnClick={this.updateUser}>
                                        <button type="submit"  style={{ width: "100px", marginLeft:"40%", backgroundColor:"green" }}>Confirm Changes</button>
                                    </div>
                                </form>
                                {this.state.redirect && (<Navigate to={'/accounts'} />)}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        );
    };
}
export default SettingsUpdate;