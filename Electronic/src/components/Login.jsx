import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {

    let { register, handleSubmit, reset } = useForm();

    let navigate = useNavigate();

    let loginlogics = (logindata) => {

        const registerdusers =
        JSON.parse(localStorage.getItem("users")) || [];

        const validuser = registerdusers.find(users =>
            users.email === logindata.email &&
            users.password === logindata.password
        );

        if (validuser){

             // store logged in user
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(validuser)
            );

            alert("Login Successful");

            navigate("/");

             window.location.reload();

            reset();

        }else{

            alert("Login Failed Check Details");
        }
    };

    return (
        <>

        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit(loginlogics)}
            >

                <h1 className="login-title">Login</h1>

                <input
                    className="login-input"
                    type='email'
                    placeholder='Enter Email'
                    {...register("email",{required:true})}
                />

                <input
                    className="login-input"
                    type='password'
                    placeholder='Enter Password'
                    {...register("password",{required:true})}
                />

                <button
                    className="login-btn"
                    type='submit'
                >
                    Login
                </button>

            </form>

        </div>

        </>
    )
}

export default Login