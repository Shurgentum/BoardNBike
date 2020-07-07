const express = require("express");
const router = express.Router();
const { User } = require("../models/user")
const bcrypt = require("bcryptjs");

// Logout functionality
router.get("/logout", (req, res, next) => {
    req.session.destroy()
    res.redirect("/")
})

// Logout functionality
router.route("/login")

    .get((req, res, next) => {
        res.render("login", {
            title: "Авторизация",
            highlighted: "login"
        });
    })

    .post(async (req, res, next) => {
        console.log(req.body)
        res.render("login", {
            title: "Авторизация",
            highlighted: "login"
        })
    })

// Registration functionality
router.route("/register")

    .get((req, res, next) => {
        res.render("register", {
            title: "Регистрация",
            highlighted: "register"
        })
    })

    .post(async (req, res, next) => {
        console.log(req.body)
        res.render("register", {
            title: "Регистрация",
            highlighted: "register"
        })
    })


module.exports = router
