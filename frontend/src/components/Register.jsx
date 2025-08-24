import React from "react"
import { useState } from "react"
import axios from "axios"
import styles from "../styles/Register.module.css";
import { Link } from "react-router-dom";


function Register() {
    const [form, setForm] = useState({username: "", email: "", password: ""})

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', form);
            alert("Registration successful!");
            console.log("Registration successful:", response.data);
            window.location.href = '/login';
        } catch (error) {
            alert("Registration failed: " + (error.response ? error.response.data.message : error.message));
            console.error("Registration error:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2 className={styles.title}>Register</h2>
            <input className={styles.input} type="text" name="username" placeholder="Username" onChange={handleChange} required></input>
            <input className={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required></input>
            <input className={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
            <button className={styles.button} type="submit">Register</button>
            <p className={styles.regtext}>Already have an account? <Link to="/login" className={styles.reglink}>Login</Link></p>
        </form>
    )
}

export default Register
