const mysql = require('../config/dbConnection.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static registerUser = async (req, res) => {
        const { name, mobile, role, isActive, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            res.send({ "status": "faild", "message": "Password and confirm password do not match" })
        } else {
            let existsQry = "SELECT * FROM user WHERE mobile = ?"
            mysql.query(existsQry, [mobile], async (err, results) => {
                if (err) throw err;
                else {
                    if (results.length > 0) {
                        res.send({ "status": "faild", "message": "User already exists" })
                    }
                    else {
                        let salt = await bcrypt.genSalt(10)
                        let hashpassword = await bcrypt.hash(password, salt)
                        let qry = "INSERT INTO user (name,mobile,role,isActive,password) values (?,?,?,?,?)";
                        mysql.query(qry, [name, mobile, role, isActive, hashpassword], (err, results) => {
                            if (err) throw err
                            else {
                                if (results.affectedRows) {
                                    let qryObj = "SELECT * FROM user WHERE mobile = ?";
                                    mysql.query(qryObj, [mobile], (err, results) => {
                                        if (err) throw err
                                        else {
                                            if (results.length > 0) {
                                                let user = results;
                                                let token = jwt.sign({ userID: user[0].userId }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                                                res.send({ "status": "success", "message": "Registraton Successfull", "token": token })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    }
    static loginUser = async (req, res) => {
        const { mobile, password } = req.body;
        let existsQry = "SELECT * FROM user WHERE mobile = ?";
        mysql.query(existsQry, [mobile], async (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    let user = results;
                    if (user[0].isActive == true) {
                        const passwordMatch = await bcrypt.compare(password, user[0].password)
                        if (user[0].mobile == mobile && passwordMatch) {
                            const token = jwt.sign({ userID: user[0].userId }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                            res.send({ "status": "success", "UserName": mobile, "UserID": user[0].user_id, "FullName": user[0].name, "UserType": user[0].role, "message": "loggin successfull", "token": token })
                        } else {
                            res.send({ "status": "faild", "message": "username or password is incorrect" })
                        }
                    } else {
                        res.send({ "status": "faild", "message": "Account is deactivated" })
                    }
                } else {
                    res.send({ "status": "faild", "message": "Invalid username" })
                }
            }
        })
    }
    static changeUserPassword = async (req, res) => {
        const { user_id, current_password, new_password, new_confirm_password } = req.body;
        if (new_password !== new_confirm_password) {
            res.send({ "status": "faild", "message": "New Password and new confirm password do not match" })
        } else {
            let existsQry = "SELECT * FROM user WHERE user_id = (?)";
            mysql.query(existsQry, [user_id], async (err, results) => {
                if (err) throw err
                else {
                    if (results.length > 0) {
                        let user = results;
                        const passwordMatch = await bcrypt.compare(current_password, user[0].password)
                        if (user[0].user_id == user_id && passwordMatch) {
                            let salt = await bcrypt.genSalt(10)
                            let hashpassword = await bcrypt.hash(new_password, salt)
                            let qry = "UPDATE user SET password = (?) WHERE user_id = (?)";
                            mysql.query(qry, [hashpassword, user_id], (err, results) => {
                                if (err) throw err
                                else {
                                    if (results.affectedRows > 0) {
                                        res.send({ "status": "success", "message": "Password Changed Succcessfully" })
                                    } else {
                                        res.send({ "status": "faild", "message": "Password not Changed Succcessfully" })
                                    }
                                }
                            })
                        }
                        else {
                            res.send({ "status": "faild", "message": "Current password is incorrect" })
                        }
                    } else {
                        res.send({ "status": "faild", "message": "Invalid username" })
                    }
                }
            })
        }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user });
    }

    static allUser = async (req, res) => {
        let qry = "CALL get_all_user";
        mysql.query(qry, (err, results) => {
            if (err) throw err;
            else {
                res.send(results)
            }
        })
    }

    static updateUser = async (req, res) => {
        const { name, mobile, role, isActive } = req.body;

        let qry = "CALL update_user(?,?,?,?)";
        mysql.query(qry, [name, mobile, role, isActive], (err, results) => {
            if (err) throw err
            else {
                res.send({ "status": "success", "message": "User updated successfully" })
            }
        })
    }
    static allExective = async (req, res) => {
        let qry = "CALL get_all_exective";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.send(results);
            }
        })
    }
    static allAdmin = async (req, res) => {
        let qry = "SELECT * FROM user WHERE role = 'admin'";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.send(results);
            }
        })
    }
    static userById = async (req, res) => {
        let qryObj = req.params.id;
        let qry = "CALL get_user_by_id(?)";
        mysql.query(qry, [qryObj], (err, results) => {
            if (err) throw err
            else {
                res.send(results);
            }
        })
    }

    static activeDeactiveUser = (req, res) => {
        let userObj = req.params.id;
        let qry = "SELECT * FROM user WHERE userId = ?";
        mysql.query(qry, [userObj], (err, results) => {
            if (err) throw err;
            else {
                if (results.length > 0) {
                    let user = results;
                    if (user[0].isActive == true) {
                        let deactiveQry = "UPDATE user SET isActive = false WHERE userId = ?";
                        mysql.query(deactiveQry, [userObj], (err, results) => {
                            if (err) throw err
                            else {
                                if (results) {
                                    res.send({ "status": "success", "message": "User deactivated" })
                                }
                            }
                        })
                    }
                    else if (user[0].isActive == false) {
                        let activeQry = "UPDATE user SET isActive = true WHERE userId = ?";
                        mysql.query(activeQry, [userObj], (err, results) => {
                            if (err) throw err
                            else {
                                if (results) {
                                    res.send({ "status": "success", "message": "User activated" })
                                }
                            }
                        })
                    }
                    // res.send(results)
                }
            }
        })
    }
}

module.exports = UserController;