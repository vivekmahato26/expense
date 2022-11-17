import axios from "axios"
import { useState,useRef } from "react"
import { baseUrl } from "../constants"
import "../styles/authPage.css"

const AuthPage = () => {
    const [registerData,setRegisterData] = useState()
    const [registerError,setRegisterError] = useState()
    const registerRef = useRef();
    const [loginData,setLoginData] = useState()
    const [loginError,setLoginError] = useState()
    const loginRef = useRef();
    const handleRegister = async(event) => {
        event.preventDefault();
        const regForm = registerRef.current;
        const body = {};
        body.name = regForm.name.value;
        body.email = regForm.email.value;
        body.phone = regForm.phone.value;
        body.password = regForm.password.value;
        body.access = regForm.access.value;
        try {
            
            const response =  await axios.post(baseUrl+"users/register",body);
            console.log(response);
            setRegisterData(response);
            if(response.data._id) {
                setRegisterError(null);
            } else {
                setRegisterError(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    const handleLogin = async(event) => {
        event.preventDefault();
        const regForm = registerRef.current;
        const body = {};
        body.email = regForm.email.value;
        body.password = regForm.password.value;
        try {
            
            const response =  await axios.post(baseUrl+"users/login",body);
            console.log(response);
            setLoginData(response);
            if(response.data.token) {
                setLoginError(null);
            } else {
                setLoginError(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className="authContainer">
            <form ref={loginRef} onSubmit={(event) => handleLogin(event)} className="loginForm">
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={registerError ? "error": ""} type="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={registerError ? "error": ""} type="password" name="password" />
                </div>
                {loginError && <p>{loginError}</p>}
                <button type="submit">Login</button>
            </form>
            <form ref={registerRef} className="registerForm" onSubmit={(event) => handleRegister(event)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name"  />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={registerError ? "error": ""} type="email" name="email" />
                    {registerError && <p>{registerError}</p>}
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" name="phone" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <label htmlFor="access">Access</label>
                    <select name="access">
                        <option value="Admin">Admin</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Editor">Editor</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default AuthPage;