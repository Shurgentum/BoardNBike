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
        const email = req.body.email
        const user = await User.findOne({ email: email })
        if (user) {
            await bcrypt.compare(req.body.password, user.password)
            req.session.user = user.id
            res.messages.send(req, "success", "Вход", "Вход успешен!")
            res.redirect("/login")
        }
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
        const email = req.body.email
        const first_name = req.body.first_name
        const last_name = req.body.last_name

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.messages.send(req, "warning", "testheader", "testtext")
            res.redirect("/register")
        } else {
            const hashedpassword = await bcrypt.hash(req.body.password, 12)
            const user = await User.create({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: hashedpassword
            })
            req.messages.send(req, "success", "Registered", `${first_name} ${last_name}, вы были успешно зарегистрированы!`)
        }
        res.render("register", {
            title: "Регистрация",
            highlighted: "register"
        })
    })


module.exports = router
