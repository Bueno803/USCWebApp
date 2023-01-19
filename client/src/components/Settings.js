import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Settings () {
    const [settings, setSettings] = useState({
        first_name: 'Default',
        last_name: 'Default',
        email: 'Default',
        password: 'Default'
    });

    //TODO make a call to the backend to get the user's settings

    return (
        <div>
            <h1>Settings</h1>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>First Name</th> 
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{settings.first_name}</td>
                        <td>{settings.last_name}</td>
                        <td>{settings.email}</td>
                        <td type= "password" >{settings.password}</td>
                    </tr>
                </tbody>
            </table>
            <NavLink className="btn btn-success" to="/settingsUpdate"> Update Settings </NavLink>
        </div>

    );
}

export default Settings;