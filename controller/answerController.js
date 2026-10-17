const dbConnection = require("../db/dbConfige");
const { StatusCodes } = require("http-status-codes");

// post an answer to a question
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide questionid and answer" });
  }

  try {
    const [q] = await dbConnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );
    if (q.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
    }

    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

// all answers of one question
async function viewAnswer(req, res) {
  const questionId = req.params.question_id;

  try {
    const [answers] = await dbConnection.query(
      `SELECT a.answerid, a.answer, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.answerid ASC`,
      [questionId]
    );
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong try again later" });
  }
}

module.exports = { postAnswer, viewAnswer };