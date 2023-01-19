import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

class Emailverification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            redirect: false
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    
    handleFirstNameChange(e) {
        this.setState({ first_name: e.target.value })
    }

    addUser(event) {
        event.preventDefault();

        if(this.state.first_name == '123455')
        {
            alert("verification is successful");
            this.setState({ redirect: this.state.redirect === false });
        }
        else{
            alert("verification not successful, Invalid code");
        }
        console.log("userAdd")

       
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
                             <h2 style={{ textAlign: "center", color: "white", marginTop:"100px" }}>Email Verification</h2>
             
                            <div style={{ display: "flex", alignItems: "center", 
                            paddingLeft:"7%",
                               color: "white" }}>

                                <form onSubmit={this.addUser} method="user"  
                                style={{width:"100%",justifyContent: "center", marginTop:"20px"}}>
                                    <div className="form-group row">
                                        <label style={{width:"300px"}}>Enter The Code</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={this.handleFirstNameChange} name="first_name" value={this.state.first_name} />
                                        </div>
                                    </div>
                                   
                                    <hr />
                                    <div style={{ width:"100%",textAlign:"center",display:"flex", alignItems:"center"  }} className="row" OnClick={this.addUser}>
                                        <button type="submit"  style={{ width: "100px", marginLeft:"40%", backgroundColor:"green" }}>Verify</button>
                                    </div>

                                </form>
                                {this.state.redirect && (<Navigate to={'/'} />)}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        );
    };
}
export default Emailverification;