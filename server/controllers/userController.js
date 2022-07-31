const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = require('../db');
const generateAccessToken = require('../utils/generateAccessToken');
const generateRandomId = require('../utils/generateRandomId');

const signInUser = (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({
            success: false,
            message: 'fields can\'t be empty',
            body: null
        })
        return;
    }
    // prepare sql query
    let sql = 'select username,password from users where email=?';
    let inserts = [connection.escape(email)];
    sql = mysql.format(sql,inserts);
    connection.query(sql, async (err, result) => {
        if(err) {
            res.status(400).json({
                success: false,
                message:err,
                body: null
            })
            return;
        }
        if(result.length === 0) {
            res.status(401).json({
                success:false,
                message:"user not registered",
                body: null
            })
        } else {
            let username = result[0].username;
            let hash = result[0].password;
            let isAvailable = await bcrypt.compare(password,hash);
            if(isAvailable) {

                // token creation
                let token = generateAccessToken({username,email});
                token = "Bearer "+token;
                res.setHeader('Authorization',token);
                res.status(201).json({
                    success:true,
                    message:"successfully logged in",
                    body: null
                })
            } else {
                res.status(401).json({
                    success:false,
                    message:"password does not match",
                    body:null
                })
            }

        }
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
    connection.query(sql, async (err,result) => {
        if(err) {
            res.status(400).json({
                success:false,
                message:err,
                body: null
            })
            return;
        }
        if(result.length == 0) {
            let uid = generateRandomId(20);
            let hashed_pass = await bcrypt.hash(password,10);
            sql = 'insert into users (id,firstname,lastname,username,email,password) values (?,?,?,?,?,?)';
            inserts = [uid,connection.escape(firstname),connection.escape(lastname),connection.escape(username),connection.escape(email),hashed_pass];
            sql = mysql.format(sql,inserts);
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