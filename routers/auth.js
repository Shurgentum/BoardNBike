const express = require("express");
const router = express.Router();
const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const { Messages } = require("../util/messages")

// Logout functionality
router.get("/logout", (req, res, next) => {
    req.session.destroy()
    res.redirect("/")
})

// Logout functionality
router.route("/login")

    .get((req, res, next) => {
        res.render("auth/login", {
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
            Messages.send(req, "success", "Вход", "Вход успешен!")
            req.session.user = user.id
            req.session.is_authenticated = true
            res.redirect("/")
        }
        req.session.destroy()
        res.render("auth/login", {
            title: "Авторизация",
            highlighted: "login"
        })
    })

// Registration functionality
router.route("/register")

    .get((req, res, next) => {
        res.render("auth/register", {
            title: "Регистрация",
            highlighted: "register"
        })
    })

    .post(async (req, res, next) => {
        const email = req.body.email
        const first_name = req.body.first_name
        const last_name = req.body.last_name

        try {
            const hashedpassword = await bcrypt.hash(req.body.password, 12)
            const user = await User.create({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: hashedpassword
            })
        } catch (err) {
            Messages.send(req, "warning", "Error", "User with this email is already registered!")
            req.session.destroy()
            res.redirect("/register")
        }
        Messages.send((req, "success", "Registered", `${first_name} ${last_name}, вы были успешно зарегистрированы!`))
        req.session.user = user.id
        req.session.is_authenticated = true
        res.redirect("/")
    })


module.exports = router
