import ProductRepository from "../repositories/product.repository.js";

const prod = new ProductRepository();

const getProducts = async (req, res) => {
    let { limit = 10, page = 1, query, sort } = req.query;
    try {
        const productos = await prod.getProducts(limit, page, query, sort);
        res.status(200).send(productos);
    } catch (err) {
        res.status(400).send(err);
    }
};
const getProductById = async (req, res) => {
    let id = req.params.id;
    try {
        const foundprod = await prod.getProductById(id);
        res.status(200).send(foundprod);
    } catch (error) {
        res.status(404).send({
            error: "Producto no encontrado",
            servererror: error,
        });
    }
};
const addProduct = async (req, res) => {
    const producto = req.body;
    try {
        const result = await prod.addProduct(producto);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
const updateProduct = async (req, res) => {
    const producto = req.body;
    try {
        const result = await prod.updateProduct(producto);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
const deleteProduct = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await prod.deleteProduct(id);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
/*

   getCarts = async (limit = 10, page = 1, query = "{}", sort) => {
        return this.cartDao.getCarts(limit, page, query, sort);
    };
    getCartById = async (cid) => {
        return this.cartDao.getCartById(cid);
    };
    addCart = async () => {
        return this.cartDao.addCart();
    };
    addProduct = async ({ cid, pid }) => {
        return this.cartDao.addProduct({ cid, pid });
    };
    updateAllProducts = async (cid, products) => {
        return this.cartDao.updateAllProducts(cid, products);
    };
    updateProductQty = async ({ cid, pid, qty }) => {
        return this.cartDao.updateProductQty({ cid, pid, qty });
    };
    deleteAllProducts = async (cid) => {
        return this.cartDao.deleteAllProducts(cid);
    };
    deleteProduct = async ({ cid, pid }) => {
        return this.cartDao.deleteProduct({ cid, pid });
    };


import { Router } from "express";
import { CartManagerDB } from "../dao/CartManagerDB.js";

const router = Router();
const carro = new CartManagerDB();

router.get("/", async (req, res) => {
    try {
        const result = await carro.getCarts();
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.render("carts", result)
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        const result = await carro.getCartById(cid);
        if (result.error) {
           res.status(400).send(result);
        } else {
            // res.status(201).send(result);
            res.render("cart", result)
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await carro.addCart();
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post("/:cid/product/:pid", async (req, res) => {
    const newCartProduct = {
        cid: req.params.cid,
        pid: req.params.pid,
    };
    try {
        const result = await carro.addProduct(newCartProduct);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        const result = await carro.deleteAllProducts(cid);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.delete("/:cid/product/:pid", async (req, res) => {
    const deleteCartProduct = {
        cid: req.params.cid,
        pid: req.params.pid,
    };
    try {
        const result = await carro.deleteProduct(deleteCartProduct);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.put("/:cid/product/:pid", async (req, res) => {
    const updateProduct = {
        cid: req.params.cid,
        pid: req.params.pid,
        qty: req.body.qty,
    };
    try {
        const result = await carro.updateProductQty(updateProduct);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body;
    try {
        const result = await carro.updateAllProducts(cid, products);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
export default router;

*/
export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};