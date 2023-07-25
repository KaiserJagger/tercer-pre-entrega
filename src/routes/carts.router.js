import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.post("/", cartController.addCart);
router.post("/:cid/product/:pid", cartController.addProduct);
router.delete("/:cid", cartController.deleteAllProducts);
router.delete("/:cid/product/:pid", cartController.deleteProduct);
router.put("/:cid/product/:pid", cartController.updateProductQty);
router.put("/:cid", cartController.updateAllProducts);

export default router;
