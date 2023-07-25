import config from "../config/config.js";

export default class Persistance {
    static getUserPers = async () => {
        switch (config.PERSISTANCE) {
            case "MONGODB":
                let { default: UserManager } = await import("./UserManagerDB.js");
                return new UserManager();
                break;
        }
    };
    static getProductPers = async () => {
        switch (config.PERSISTANCE) {
            case "MONGODB":
                let { default: ProductManager } = await import("./ProductManagerDB.js");
                return new ProductManager();
                break;
        }
    };
    static getCartPers = async () => {
        // console.log('getCartPers')
        switch (config.PERSISTANCE) {
            case "MONGODB":
                // console.log('MONGODB')
                let { default: CartManagerDB } = await import("./CartManagerDB.js");
                return new CartManagerDB();
                break;
        }
    };
}
