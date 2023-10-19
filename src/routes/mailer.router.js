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

export default router;
