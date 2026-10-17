const dbConnection = require("../db/dbConfige");
const { StatusCodes } = require("http-status-codes");
const { randomUUID } = require("crypto");

// all questions, newest first
async function allQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT q.questionid, q.title, q.description, q.tag, u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       ORDER BY q.id DESC`
    );
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

// post a new question
async function postQuestions(req, res) {
  const { title, description, tag } = req.body;
  const userid = req.user.userid;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide title and description" });
  }

  try {
    const questionid = randomUUID();
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag || null]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question posted successfully", questionid });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

// one question by questionid
async function questionId(req, res) {
  const questionid = req.params.questionid;

  try {
    const [rows] = await dbConnection.query(
      `SELECT q.questionid, q.title, q.description, q.tag, u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [questionid]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
    }
    return res.status(StatusCodes.OK).json({ question: rows[0] });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

module.exports = { allQuestions, postQuestions, questionId };