import {Router} from "express"
import { generateMockProducts } from "../utils.js"

const router = Router()

router.get("/", async (req, res) => {
    const response = {
        status: "success",
        payload: generateMockProducts(50)
    };
    console.log(response)
    res.status(200).send(response)
});

router.get("/:qty", async (req,res) => {
    const qty = isNaN(parseInt(req.params.qty))? 50 : parseInt(req.params.qty);
    const response = {
        status: "success",
        payload: generateMockProducts(qty),
    }
    console.log(response)
    res.status(200).send(response)
});

export default router;


