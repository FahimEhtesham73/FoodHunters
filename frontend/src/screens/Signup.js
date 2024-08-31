import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "", isAdmin: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/CreateUser", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            });

            console.log("response status:", response.status);
            try {
                const json = await response.json();
                console.log("data", json);

                if (!json.success) {
                    alert("Enter Valid Credentials");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } catch (error) {
            console.error("Network Error:", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input type="text" className="form-control" placeholder="Enter your Name" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" name='email' value={credentials.email} onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Location</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="your location" name='location' value={credentials.location} onChange={onChange} />
                    </div>
                    {/* Hide the isAdmin field from the user interface */}
                    <input type="hidden" name="isAdmin" value={credentials.isAdmin} />

                    <button type="submit" className="m-3 btn btn-info">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'> Already a User</Link>
                </form>
            </div>
        </>
    );
}
