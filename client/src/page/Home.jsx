import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "./axios.config";
import { AppState } from "../App";
import "../App.css";

function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const { data } = await axios.get("/questions/all-questions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
       setQuestions(data.questions || []);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  const filtered = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="page">
        <div className="home-top">
          <Link to="/ask" className="ask-btn">
            Ask Question
          </Link>
          <div className="welcome-banner">
            Welcome:
            <span className="username-highlight">{user?.username}</span>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="questions-list">
          {loading && <p className="empty-text">Loading...</p>}
          {!loading && filtered.length === 0 && (
            <p className="empty-text">No questions found.</p>
          )}

          {filtered.map((q) => (
            <Link
              to={`/question/${q.questionid}`}
              className="question-item"
              key={q.questionid}
            >
              <div className="user-profile-summary">
                <div className="avatar-circle">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span className="username-label">{q.username}</span>
              </div>
              <div className="question-title-text">{q.title}</div>
              <div className="question-arrow">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;