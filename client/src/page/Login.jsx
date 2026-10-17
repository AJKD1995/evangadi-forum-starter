import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import "../App.css";
import { useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "./axios.config";


function Login() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const username = userNameDom.current.value;
    const password = passwordDom.current.value;
    if (!username || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      const {data} = await axios.post("/users/login", {
        username: username,
        password: password
      });
      alert("Login successful!");
    localStorage.setItem("token", data.token); 

      console.log(data);
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      alert(error?.response?.data?.msg || "Error logging in. Please fill in all fields.");
      console.error("Error logging in:", error.response);
    }
  }
  return (
    <>
      <Header />
      <main className="page">
        <div className="auth-grid">
          <div className="auth-form-card">
            <div className="form-container active-form">
              <h2>Login to your account</h2>
              <p className="sub-text">
                Don't have an account? <Link to="/register">Create a new account</Link>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input ref={userNameDom} type="text" placeholder="Username" />
                </div>
                <div className="input-group">
                  <input ref={passwordDom} type="password" placeholder="Password" />
                </div>
                <button className="primary-btn">Login</button>
              </form>
            </div>
          </div>
          <About />
        </div>
      </main>
      <Footer />
      <Link to="/register" className="back-to-register">
        Back to Register
      </Link>
    </>
  )};
export default Login
