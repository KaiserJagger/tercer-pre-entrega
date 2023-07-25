import { Router } from "express";
import { messageModel } from "../models/messageModel.js";
import { passportAuthenticateApi } from "../utils.js";

const router = Router();

router.get("/", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para entrar al chat",
        });
    } else {
        next("route");
    }
});
router.get("/", async (req, res) => {
    try {
        const onehourago = new Date(Date.now() - 1000 * 60 * 60);
        console.log(onehourago);
        // traigo los mensajes de la ultima hora
        const messages = await messageModel
            .find({ date: { $gt: onehourago } })
            .lean()
            .exec();
        res.render("chat", { messages });
    } catch (error) {
        console.log("ERROR DE CONEXION: " + error);
    }
});

export default router;
