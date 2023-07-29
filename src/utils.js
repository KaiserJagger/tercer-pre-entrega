import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { fakerES } from "@faker-js/faker"

import config from "./config/config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
export default __dirname;

export const generateToken = (user) => {
    const token = jwt.sign({ user }, config.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};
export const extractCookie = (req) => {
    return req && req.cookies ? req.cookies[config.JWT_COOKIE] : null;
};
export const passportAuthenticate = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (!user)
                return res.status(401).render("login", {
                    message: {
                        type: "error",
                        title: info.title ? info.title : "Error",
                        text: info.text ? info.text : "Iniciá la sesión",
                    },
                });
            req.user = user;
            next();
        })(req, res, next);
    };
};
export const userLogged = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (user) return res.redirect("products");
            next();
        })(req, res, next);
    };
};
export const passportAuthenticateApi = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (!user)
                return res.status(401).send({
                    error: "No existe una sesión de usuario activa",
                });
            req.user = user;
            next();
        })(req, res, next);
    };
};

export const generateMockProducts = (qty) => {
    const products = [];
    for (let i = 0; i < qty; i++) {
        products.push({
            _id: fakerES.database.mongodbObjectId(),
            title: fakerES.commerce.productName(),
            description: fakerES.commerce.productDescription(),
            category: fakerES.commerce.department(),
            status: fakerES.datatype.boolean(0.8),
            thumbnails: [fakerES.image.url()],
            code: fakerES.string.alpha({ length: 8, casing: "upper" }),
            stock: fakerES.number.int({ max: 100 }),
            price: fakerES.commerce.price({ min: 1000, max: 10000, dec: 2 }),
            id: fakerES.string.alpha({ length: 25, casing: "upper" }),
        });
    }
    return products;
};