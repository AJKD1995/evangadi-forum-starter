import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "./page/axios.config";
import Ask from "./page/Ask";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Answer from "./page/Answer";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    if (publicPaths.includes(pathname)) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function checkUser() {
      try {
        const { data } = await axios.get("/users/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.log(
          "CHECK FAILED:",
          error.response?.status,
          error.config?.baseURL,
          error.config?.url
        );
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    checkUser();
  }, [pathname, navigate]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/question/:questionid" element={<Answer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
