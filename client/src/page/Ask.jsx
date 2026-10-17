import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "./axios.config";
import "../App.css";

function Ask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in the title and the details");
      return;
    }

    try {
      await axios.post(
        "/questions/post-questions",
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      navigate("/home"); // the new question appears at the top of the list
    } catch (error) {
      alert(error?.response?.data?.msg || "Could not post your question. Please try again.");
      console.error("Error posting question:", error.response);
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <div className="ask-container">
          <div className="instructions-box">
            <h2>Steps To Write A Good Question.</h2>
            <ul>
              <li>
                <i className="fa-solid fa-circle-chevron-right"></i>
                Summarize your problems in a one-line-title.
              </li>
              <li>
                <i className="fa-solid fa-circle-chevron-right"></i>
                Describe your problem in more detail.
              </li>
              <li>
                <i className="fa-solid fa-circle-chevron-right"></i>
                Describe what you tried and what you expected to happen.
              </li>
              <li>
                <i className="fa-solid fa-circle-chevron-right"></i>
                Review your question and post it here.
              </li>
            </ul>
          </div>

          <div className="post-question-card">
            <h2>Post Your Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Question title"
                  maxLength={255}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <textarea
                  rows="6"
                  placeholder="Question detail ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="post-submit-btn">
                Post Question
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Ask;