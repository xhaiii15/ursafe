import React from "react"
import { useState } from "react"
import axios from "axios"
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({username: "", password: ""})

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', form);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            alert("Login successful!");
            console.log("Login successful:", response.data);
            window.location.href = '/dash';
        } catch (error){
            alert("Login failed: " + (error.response ? error.response.data.message : error.message));
            console.error("Login error:", error);
        }
    }
    return (
        <form className={styles.formContainer} onSubmit={handleSubmit} >
            <h2 className={styles.title}>Login</h2>
            <input className={styles.input} type="username" name="username" placeholder="Username" onChange={handleChange} required></input>
            <input className={styles.input}type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
            <button className={styles.button} type="submit">Login</button>
            <p className={styles.regtext}>Don't have an account? <Link to="/register" className={styles.reglink}>Register</Link></p>
        </form>
    )
}

export default Login
