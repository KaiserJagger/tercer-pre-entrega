import { Router } from "express";
import cartController from "../controllers/apiCart.controller.js";
import { passportAuthenticateApi } from "../utils.js";

const router = Router();

router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.post("/", cartController.addCart);
router.post("/:cid/product/:pid", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.post("/:cid/product/:pid", cartController.addProduct);
router.delete("/:cid", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.delete("/:cid", cartController.deleteAllProducts);
router.delete("/:cid/product/:pid", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.delete("/:cid/product/:pid", cartController.deleteProduct);
router.put("/:cid/product/:pid", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.put("/:cid/product/:pid", cartController.updateProductQty);
router.put("/:cid", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.put("/:cid", cartController.updateAllProducts);
router.get("/:cid/purchase", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "user") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.get("/:cid/purchase", cartController.closeCart)
export default router;