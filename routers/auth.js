const express = require("express");
const router = express.Router();
const { User } = require("../models/user")
const bcryptjs = require("bcryptjs")
const { Messages } = require("../util/messages")
const validation = require("../util/validation");
const { UniqueConstraintError } = require("sequelize")

// Logout functionality
router.get("/logout", (req, res, next) => {
    req.session.user = 0
    req.session.is_authenticated = false
    Messages.send(req, "success", "Выход", "Выход осуществлён!")
    res.redirect("/")
})

router.all("*", (req, res, next) => {
    // Protection against double login/register
    if (req.session.user) return res.redirect("/")
    else { next() }
})
// Logout functionality
router.route("/login")

    .get((req, res, next) => {
        return res.render("auth/login", {
            title: "Авторизация",
            highlighted: "login"
        });
    })

    .post(async (req, res, next) => {
        const email = req.body.email
        // Checking for user in database, if present - compare hases and authenticate
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            // Check for match between user input string and hash in database
            if (await bcryptjs.compare(req.body.password, user.password)) {
                Messages.send(req, "success", "Вход", "Вход успешен!")
                req.session.user = user.id
                req.session.is_authenticated = true
                return res.redirect("/")
            }
        }
        Messages.send(req, "error", "Ошибка", "Логин или пароль не верны!")
        return res.render("auth/login", {
            title: "Авторизация",
            highlighted: "login"
        })
    })

// Registration functionality
router.route("/register")

    .get((req, res, next) => {
        return res.render("auth/register", {
            title: "Регистрация",
            highlighted: "register"
        })
    })

    .post(async (req, res, next) => {
        const email = req.body.email
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        try {
            // Validation
            validation.validateRegisterData(email, req.body.password1, req.body.password2)
            // Hashing password and saving new user
            const hashedpassword = await bcryptjs.hash(req.body.password1, 12)
            const user = await User.create({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: hashedpassword
            })
            Messages.send(req, "success", "Registered", `${first_name} ${last_name}, вы были успешно зарегистрированы!`)
            req.session.user = user.id
            req.session.is_authenticated = true
            return res.redirect("/")
        } catch (err) {
            // Handling custom validation errors
            if (err instanceof validation.ValidationError) Messages.send(req, "warning", "Error", "Validation error!")
            // Handling unique constraint error for logins
            else if (err instanceof UniqueConstraintError) Messages.send(req, "warning", "Error", "User with this email is already registered!")
            else Messages.send(req, "warning", "Error", "Registration error!")
            return res.redirect("/register")
        }
    })


module.exports = router
