import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "./axios.config";
import "../App.css";

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

function Answer() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

 const loadAnswers = useCallback(async () => {
  try {
    const { data } = await axios.get(`/answers/${questionid}`, authConfig());
  setAnswers(data.answers || []);
  } catch (error) {
    console.log(error.response);
  }
}, [questionid]);

  useEffect(() => {
  async function loadQuestion() {
    try {
      const { data } = await axios.get(`/questions/${questionid}`, authConfig());
      setQuestion(data.question);
    } catch (error) {
      console.log(error.response);
    }
  }
  loadQuestion();
  loadAnswers();
}, [questionid, loadAnswers]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!answerText.trim()) {
      alert("Please write your answer");
      return;
    }

    try {
      await axios.post(
        "/answers/post-answer",
        { questionid, answer: answerText },
        authConfig()
      );
      setAnswerText("");
      loadAnswers(); // show the new answer with the others
    } catch (error) {
      alert(error?.response?.data?.msg || "Could not post your answer. Please try again.");
      console.error(error.response);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <div className="ask-container">
          {question ? (
            <div className="question-box">
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <span className="asked-by">Asked by {question.username}</span>
            </div>
          ) : (
            <p className="empty-text">Loading...</p>
          )}

          <h3 className="community-title">Answer from the Community</h3>

          {answers.length === 0 && (
            <p className="empty-text">No answers yet. Be the first to answer!</p>
          )}

          {answers.map((a) => (
            <div className="answer-item" key={a.answerid}>
              <div className="user-profile-summary">
                <div className="avatar-circle">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span className="username-label">{a.username}</span>
              </div>
              <p className="answer-text">{a.answer}</p>
            </div>
          ))}

          <div className="post-question-card">
            <h2>Your Answer</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <textarea
                  rows="6"
                  placeholder="Your Answer..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="post-submit-btn">
                Post Answer
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Answer;