import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
const port = 5001;

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // first_name: "",
            // last_name: "",
            email: "",
            password: "",
            verified: true,
            redirect: false
        }
        // this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        // this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.addUser = this.addUser.bind(this);
        // this.checkAccountStatus = this.checkAccountStatus.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    // checkAccountStatus(event) {
    //     event.preventDefault();
    //     const userVerify = {
    //         email: this.state.email,
    //     }
    //     axios.post("http://localhost:" + port + "/accounts/checkverified", userVerify)
    //     .then(res => {
    //         if(res.data == false) {
    //             alert("Please verify your email!");
    //             this.verifyUser;
    //             // window.location.href="./LoggedIn";
    //         }
    //         // console.log(res);
    //         // console.log(res.data);
    //         // if(res.data.status == "OK") {
    //         //     window.localStorage.setItem("token", res.data.data);
    //         //     window.location.href="./LoggedIn";
    //         // }
    //         this.setState({ redirect: this.state.redirect === false });
    //     })
    //     .catch(err => {
    //         if(err.request.status===404)
    //         {
    //             alert("Account not found. Status code "+err.request.status+" !")
    //         }
    //         console.log(err) 
    //     });
    // }
    
    verifyUser(event) {
        event.preventDefault();
        let userVerify = {
            email: this.state.email,
            password: this.state.password,
            verified: this.state.verified
        }
        // console.log(userVerify)

        axios.post("http://localhost:" + port + "/accounts/verify", userVerify)
            .then(res => {
                // console.log(res);
                console.log(res.data)
                // console.log(res.data.data);
                if(res.data.status == "OK") {
                    window.localStorage.setItem("token", res.data.data);
                    // HomeScreen.verifyEmail.call(event);
                    //window.location.href="./LoggedIn";
                }
                this.setState({ redirect: this.state.redirect === false });
            })
            .catch(err => {
                if(err.request.status===404)
                {
                    alert("Account not found. Status code "+err.request.status+" !")
                }
                console.log(err) 
            });

            userVerify = {
                email: this.state.email,
            }
            console.log(userVerify);
            console.log("email val?");
            axios.post("http://localhost:" + port + "/accounts/checkverified", userVerify)
            .then(res => {
                if(res.data == false) {
                    alert("Please verify your email!");
                    window.location.href="./Emailverification";
                } else {
                    // console.log(res.status)
                    window.location.href="./LoggedIn";
                }
                // console.log(res);
                // console.log(res.data);
                // if(res.data.status == "OK") {
                //     window.localStorage.setItem("token", res.data.data);
                //     window.location.href="./LoggedIn";
                // }
                this.setState({ redirect: this.state.redirect === false });
            })
            .catch(err => {
                if(err.request.status===404)
                {
                    alert("Account not found. Status code "+err.request.status+" !")
                }
                console.log(err) 
            });
    }

    render() {
        return (

            <div>
                <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                    <div style={{ width: "10%", backgroundColor: "black" }}>
                        <h1 style={{color:"white"}}>Navigation Drawer</h1>
                    </div>

                    <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{
                            width: "45%", height: "400px", backgroundColor: "gray",
                            borderRadius: "100px"
                        }}>
                             <h2 style={{ textAlign: "center", color: "white" }}>Login</h2>
             
                            <div style={{ display: "flex", alignItems: "center", 
                            paddingLeft:"7%",
                               color: "white" }}>

                                {/* <form onSubmit={this.state.redirect && (<Navigate to={'/SignUp'} />)} method="user"  
                                style={{width:"100%",justifyContent: "center"}}> */}
                                <div>
                                    {/* <div className="form-group row">
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
                                    </div> */}
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
                                    {/* <div style={{ width:"100%",textAlign:"center",display:"flex", alignItems:"center"  }} className="row" OnClick={this.state.redirect && (<Navigate to={'/lists'} />)}> */}
                                    {/* <div style={{ width:"100%",textAlign:"center",display:"flex", alignItems:"center"  }} className="row" OnClick={this.addUser}> */}
                                        {/* <button type="submit"  style={{ width: "100px", marginLeft:"40%", backgroundColor:"green" }}>Signup</button>
                                    </div> */}
                                    <a href="/signup">SignUp</a>
                                    <div style={{ width:"100%",textAlign:"center",display:"flex", alignItems:"center"  }} className="row" onClick ={this.verifyUser}>
                                        <button type="submit"  style={{ width: "100px", marginLeft:"40%", backgroundColor:"green" }}>Login</button>
                                    </div>
                                    </div>
                                {/* </form> */}
                                {/* {this.state.redirect && (<Navigate to={'/emailverification'} />)} */}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        );
    };
}
export default HomeScreen;