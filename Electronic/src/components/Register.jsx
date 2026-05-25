    import React from 'react'
    import { useForm } from 'react-hook-form';
    import "./Register.css";
import { useNavigate } from 'react-router-dom';

    function Register() {
        const { register, handleSubmit, reset } = useForm();
        let navigate=useNavigate();

    let registerLogics = (userdata) => {
        // get the users from local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //add the users to exisintg array
        users.push(userdata);

        //set the data to localstorge.
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        navigate("/login")
        reset();
    };
    return (
    <>
    
    <div className="register-page">

        <div className="register-box">

            <h1 className="register-heading">
                Create Account
            </h1>

            <form
                className="register-form"
                onSubmit={handleSubmit(registerLogics)}
            >

                <input
                    className="register-input"
                    type="text"
                    placeholder="Enter Full Name"
                    {...register("name", { required: true })}
                />

                <input
                    className="register-input"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", { required: true })}
                />

                <input
                    className="register-input"
                    type="email"
                    placeholder="Enter Email Address"
                    {...register("email", { required: true })}
                />

                <input
                    className="register-input"
                    type="number"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                />

                <button
                    className="register-btn"
                    type="submit"
                >
                    Register
                </button>

            </form>

        </div>

    </div>

    </>
)
    
    }

    export default Register