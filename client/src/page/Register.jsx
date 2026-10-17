import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import "../App.css";
import { useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "./axios.config";


function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const username = userNameDom.current.value;
    const firstName = firstNameDom.current.value;
    const lastName = lastNameDom.current.value;
    const email = emailDom.current.value;
    const password = passwordDom.current.value;
    if (
      !username || !firstName || !lastName || !email || !password
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      alert("User registered successfully! Please login now");
      navigate("/login");
    } catch (error) {
      alert("Error registering user. Please try again.");
      console.error("Error registering user:", error.response);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <div className="auth-grid">
          <div className="auth-form-card">
            <div className="form-container active-form">
              <h2>Join the network</h2>
              <p className="sub-text">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input ref={userNameDom} type="text" placeholder="Username" />
                </div>
                <div className="input-row double">
                  <div className="input-group">
                    <input ref={firstNameDom} type="text" placeholder="First Name" />
                  </div>
                  <div className="input-group">
                    <input ref={lastNameDom} type="text" placeholder="Last Name" />
                  </div>
                </div>
                <div className="input-group">
                  <input ref={emailDom} type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <input ref={passwordDom} type="password" placeholder="Password" />
                </div>
                <button className="primary-btn">Register</button>
              </form>
            </div>
          </div>
          <About />
        </div>
      </main>
      <Footer />
      <Link to="/login" className="back-to-login">
        Back to Login
      </Link>
    </>
  )};

export default Register
