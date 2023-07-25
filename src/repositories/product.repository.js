import Persistance from "../dao/factory.js";

export default class ProductRepository {
    constructor() {
        this.productDao;
        this.init();
    }

    init = async () => {
        this.productDao = await Persistance.getProductPers();
    };

    getProducts = async (limit = 10, page = 1, query = "{}", sort) => {
        return this.productDao.getProducts(limit, page, query, sort);
    };
    getProductById = async (id) => {
        return this.productDao.getProductById(id);
    };
    addProduct = async ({
        title,
        description,
        price,
        thumbnails = [],
        code,
        stock,
        category,
        status = true,
    }) => {
        return this.productDao.addProduct({
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
        });
    };
    updateProduct = async ({
        id,
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status,
    }) => {
        return this.productDao.updateProduct({
            id,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status,
        });
    };
    deleteProduct = async (id) => {
        return this.productDao.deleteProduct(id);
    };
}