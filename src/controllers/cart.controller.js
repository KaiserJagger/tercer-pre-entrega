import CartRepository from "../repositories/cart.repository.js";

const carro = new CartRepository();

const getCarts = async (req, res) => {
  try {
    const result = await carro.getCarts();
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.render("carts", result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const getCartById = async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await carro.getCartById(cid);
    if (result.error) {
      res.status(400).send(result);
    } else {
      // res.status(201).send(result);
      res.render("cart", result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const addCart = async (req, res) => {
  try {
    const result = await carro.addCart(req.user.id);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const addProduct = async (req, res) => {
  const newCartProduct = {
    cid: req.params.cid,
    pid: req.params.pid,
  };
  try {
    if (newCartProduct.cid === "null" && req.user.cart === null) {
      const newCart = await carro.addCart(req.user._id);
      console.log(newCart);
    } else {
      const result = await carro.addProduct(newCartProduct);
      const updatedcart = await carro.getCartById(newCartProduct.cid);
      if ("error" in result) {
        updatedcart.message = {
          type: "Error",
          title: "El producto no pudo agregarse al carro.",
          status: 404,
        };
      } else {
        updatedcart.message = {
          type: "success",
          title: "Agregaste un producto a tu carro.",
          status: 200,
        };
      }
      res.status(updatedcart.message.status).render("cart", updatedcart);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const deleteAllProducts = async (req, res) => {
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
};
const deleteProduct = async (req, res) => {
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
};
const updateProductQty = async (req, res) => {
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
};
const updateAllProducts = async (req, res) => {
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
};
const closeCart = async (req, res) => {
  const cart = {
    cid: req.params.cid,
    user: req.user,
  };
  try {
    const result = await carro.closeCart(cart);
    if ("error" in result) {
      result.message = {
        type: "Error",
        title: "Error al generar el ticket",
        text: "No pudimos completar la compra vuelve a imtentarlo mas tarde.",
        status: 404,
      };
    } else {
      result.message = {
        type: "success",
        title: "Compra finalizada",
        text: "Recibirás un email con los detalles de la compra",
        status: 200,
      };
    }
    res.status(result.message.status).render("cartpurchase", result);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  getCarts,
  getCartById,
  addCart,
  addProduct,
  deleteAllProducts,
  deleteProduct,
  updateProductQty,
  updateAllProducts,
  closeCart,
};
