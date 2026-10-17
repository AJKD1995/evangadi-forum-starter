//db connection
const express = require('express');
const dbConnection = require('../db/dbConfige')

const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    if (!email || !password || !firstName || !lastName || !username) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required fields" });
    }


    try {

        const [user] = await dbConnection.query("select username,userid from users where username = ? or email = ?", [username, email]);
        //
        if (user.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" });
        }

        if (password.length < 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password must be at least 8 characters long" });
        }
        //encrypt password
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt

        await dbConnection.query('INSERT INTO users (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)', [username, firstName, lastName, email, hashedPassword]);
        return res.status(StatusCodes.CREATED).json({ msg: "User registered successfully" });
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong try again later" });
    }



}





async function login(req, res) {
  const { username, password } = req.body;
    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required fields" });
    }
    try {
     const [user] = await dbConnection.query("select * from users where username = ?", [username]);
        if (user.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid username or password" });
        }
       //compare password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid username or password" });
        }
        const dbusername = user[0].username;
        const dbuserid = user[0].userid;
         const token = jwt.sign({username: dbusername, userid: dbuserid}, process.env.JWT_SECRET,{expiresIn: '1h'})
         return res.status(StatusCodes.OK).json({ msg: "User logged in successfully", token ,username: dbusername, userid: dbuserid});
    

}catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong try again later" });
    }
}



async function checkuser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  return res.status(StatusCodes.OK).json({
    msg: "valid user",
    username,
    userid
  });
}

module.exports = { register, login, checkuser } 