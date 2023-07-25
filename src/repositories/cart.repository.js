import Persistance from "../dao/factory.js";

export default class CartRepository {
    constructor() {
        this.cartDao;
        this.init();
    }

    init = async () => {
        this.cartDao = await Persistance.getCartPers();
    };

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
    closeCart = async(cid) =>{
        return this.cartDao.closeCart(cid)
    }
}