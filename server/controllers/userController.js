const bcrypt = require('bcrypt');
const connection = require('../db');
const UserModel = require('../model/userModel');
const generateRandomId = require('../utils/generateRandomId');
const generateAccessToken = require('../utils/generateAccessToken');
const userModel = new UserModel();

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
    let mail = connection.escape(email).toLowerCase();
    let values = {email:mail};
    userModel.select('users',values,async (err, result) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message:err,
                body: null
            })
        }
        if(result.length === 0) {
            return res.status(401).json({
                success:false,
                message:"user not registered",
                body: null
            })
        }
        let username = result[0].username;
        let hash = result[0].password;
        let isAvailable = await bcrypt.compare(password,hash);
        if(isAvailable) {
            // token creation
            let token = generateAccessToken({username,email});
            token = "Bearer "+token;
            res.setHeader('Authorization',token);
            return res.status(200).json({
                success:true,
                message:"successfully logged in",
                body: null
            })
        }
        return res.status(401).json({
            success:false,
            message:"password does not match",
            body:null
        })
    })
}

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
    // escape from sqli
    let fname = connection.escape(firstname).toLowerCase();
    let lname = connection.escape(lastname).toLowerCase();
    let uname = connection.escape(username).toLowerCase();
    let mail = connection.escape(email).toLowerCase();
    // execute query
    let emailField = {email:mail};
    let usernameField = {username:uname};
    let fields = `${emailField} or ${usernameField}`
    userModel.select('users',fields, async (err,result) => {
        if(err) {
            res.status(400).json({
                success:false,
                message:err,
                body: null
            })
            return;
        }
        if(result.length == 0) {
            let uid = generateRandomId(20).toString();
            let hashed_pass = await bcrypt.hash(password,10);
            hashed_pass = hashed_pass.toString();
            let values = {id:uid,firstname:fname,lastname:lname,username:uname,email:mail,password:hashed_pass};
            userModel.save('users',values,(err, results) => {
                if(err || results.length === 0) {
                    return res.status(400).json({
                    success:false,
                    message:err,
                    body: null
                })
                }
                // token creation
                let token = generateAccessToken({username,email});
                token = "Bearer "+token;
                res.setHeader('Authorization',token);
                res.status(201).json({
                    success:true,
                    message:"successfully registered",
                    body: null
                })
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