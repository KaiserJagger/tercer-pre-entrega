import nodemailer from "nodemailer";
import { Router } from "express";
import passport from "passport";
import { passportAuthenticateApi } from "../utils.js";
import UserDto from "../dto/user.dto.js";
import config from "../config/config.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: config.MAIL_APP_USER,
                pass: config.MAIL_APP_PASS,
            },
        });
        const result = await transport.sendMail({
            from:
                "JaggerStore - Informatica <" +
                config.MAIL_APP_USER +
                ">",
            to: "kaiserjager10@gmail.com.com",
            subject: "Correo de prueba",
            html: `
            <div>
                <h1>PRUEBA</h1>
            </div>
            `,
            attachments: [],
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
/*
router.get("/login", userLogged("jwt"), (req, res) => {
    res.render("login", {});
});
router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/failurelogin" }),
    async (req, res) => {
        if (!req.user) {
            res.render("login", {
                message: {
                    type: "error",
                    title: "Error de logueo",
                    text: "El correo eletrónico o contraseña no son correctos",
                },
            });
        } else {
            delete req.user.password;
            delete req.user._id;
            delete req.user.__v;
            res.cookie(config.JWT_COOKIE, req.user.token).redirect(
                "/products",
            );
        }
    },
);
router.get("/register", userLogged("jwt"), (req, res) => {
    res.render("register", {});
});
router.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "failureregister",
    }),
    async (req, res) => {
        res.render("login", {
            message: {
                type: "success",
                title: "Registro exitoso",
                text: "Iniciá tu session con los datos cargados",
            },
        });
    },
);
router.get("/logout", (req, res) => {
    res.clearCookie(config.JWT_COOKIE).redirect("login");
});
router.get("/failureregister", (req, res) => {
    res.render("register", {
        message: {
            type: "error",
            title: "Error de registro",
            text: "El email ya se encuentre registrado",
        },
    });
});
router.get("/failurelogin", (req, res) => {
    res.render("login", {
        message: {
            type: "error",
            title: "Error de logueo",
            text: "El correo eletrónico o contraseña no son correctos",
        },
    });
});
router.get(
    "/githublogin",
    passport.authenticate("github", { scope: ["user: email"] }),
    (req, res) => {},
);
router.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/failurelogin" }),
    async (req, res) => {
        delete req.user.password;
        delete req.user._id;
        delete req.user.__v;
        const token = generateToken(req.user);
        req.user.token = token;
        res.cookie(config.JWT_COOKIE, req.user.token).redirect(
            "/products",
        );
    },
);
router.get("/current",  passportAuthenticateApi("jwt"), (req, res) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    }
    const user = new UserDto(req.user)
    res.send(user);
});
*/
export default router;