import ProductRepository from "../repositories/product.repository.js";

const prod = new ProductRepository();

const getProducts = async (req, res) => {
  let { limit, page, query, sort } = req.query;
  try {
    const productos = await prod.getProducts(limit, page, query, sort);
    const user = req.user;
    res.render("products", {
      productos: productos,
      user: user,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
const getProductById = async (req, res) => {
  let id = req.params.id;
  try {
    const foundprod = await prod.getProductById(id);
    const user = req.user;
    res.render("product", {
      product: foundprod,
      user: user,
    });
  } catch (error) {
    res.status(404).send({
      error: "Producto no encontrado",
      servererror: error,
    });
  }
};
export default {
  getProducts,
  getProductById,
};
