const mysql = require('mysql');
const connection = require('../db');
const generateAccessToken = require('../utils/generateAccessToken');

const signInUser = (req,res) => {
    connection.query(`select * from users`, (err, result) => {
        if(err) console.log("Error: "+err);
        console.log(result);
    })
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
            res.status(400).json({
                success:false,
                message:err,
                body: null
            })
            return;
        }
        if(result.length == 0) {
            let uid = 123;
            let hashed_pass = 'sakdksdkkaskdf';
            sql = 'insert into users (id,firstname,lastname,username,email,password) values (?,?,?,?,?,?)';
            inserts = [uid,connection.escape(firstname),connection.escape(lastname),connection.escape(username),connection.escape(email),hashed_pass];
            sql = mysql.format(sql,inserts);
            console.log(sql);
            connection.query(sql, (err, results) => {
                if(err) {
                    res.status(400).json({
                    success:false,
                    message:err,
                    body: null
                })
                return;
                }
                if(results.length === 0) {
                    res.status(400).json({
                        success:false,
                        message:err,
                        body: null
                    })
                    return;
                } else {
                    // token creation
                    let token = generateAccessToken({username,email});
                    token = "Bearer "+token;
                    res.setHeader('Authorization',token);
                    res.status(201).json({
                        success:true,
                        message:"successfully registered",
                        body: null
                    })
                }
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