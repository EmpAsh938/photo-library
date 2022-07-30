const mysql = require('mysql');
const connection = require('../model/db');
const generateAccessToken = require('../utils/generateAccessToken');

const signInUser = (req,res) => {
    res.json({
        message:"login"
    })
};

const registerUser = (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    if(!firstname || !lastname || !username || !email || !password) {
        res.status(400).json({
            success: false,
            message: "Fields can't be empty.",
            body: null
        })
        return;
    }
    // prepare sql query
    let sql = `select id from users where email=? or username=?`;
    let inserts = [connection.escape(email),connection.escape(username)];
    sql = mysql.format(sql, inserts);
    // execute query
    connection.query(sql, (err,result) => {
        if(err) {
            res.status(500).json({
                success:false,
                message:err,
                body: null
            })
            return;
        }
        if(result.length == 0) {
            // token creation
            let token = generateAccessToken({username,email});
            token = "Bearer "+token;
            res.setHeader('Authorization',token);
            res.status(201).json({
                success:true,
                message:"successfully registered",
                body: token
            })
        } else {
            res.status(403).json({
                success:false,
                message:"username/email not available",
                body: null
            })
        }
    })
}

module.exports = {
    signInUser,
    registerUser
}