import { Router } from "express";
import productController from "../controllers/apiProduct.controller.js";
import { passportAuthenticateApi } from "../utils.js";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "admin") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.post("/", productController.addProduct);
router.put("/", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "admin") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.put("/", productController.updateProduct);
router.delete("/:id", passportAuthenticateApi("jwt"), (req, res, next) => {
    if (!req.user) {
        res.status(400).send({
            error: "No existe una sesión de usuario activa",
        });
    } else if (req.user.role !== "admin") {
        res.status(401).send({
            error: "No esta autorizado para editar productos",
        });
    } else {
        next("route");
    }
});
router.delete("/:id", productController.deleteProduct);


export default router;
