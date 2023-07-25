import mongoose from "mongoose";
import nodemailer from "nodemailer";
import twilio from "twilio";

import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import ticketModel from "../models/ticket.model.js";

import config from "../config/config.js";

const productModelCart = mongoose.model(
    productModel.productCollection,
    productModel.productSchema
);
const ticketModelCart = mongoose.model(
    ticketModel.ticketCollection,
    ticketModel.ticketSchema
);

export default class CartManagerDB {
    constructor() {
        this.cartModel = mongoose.model(
            cartModel.cartCollection,
            cartModel.cartSchema
        );
    }
    getCarts = async (limit = 10, page = 1, query = "{}", sort) => {
        // verifico si query tiene un formato valido
        const isValidJSON = (query) => {
            try {
                JSON.parse(query);
                return true;
            } catch (e) {
                return false;
            }
        };
        const vquery = isValidJSON ? JSON.parse(query) : {};
        // verifico si sort tiene un formato valido
        const carts = this.cartModel.paginate(vquery, {
            page,
            limit,
            lean: true,
            sort,
        });
        return carts;
    };
    getCartById = async (cid) => {
        // busco el indice del Carro
        try {
            const cartfound = await this.cartModel
                .findOne({ _id: cid })
                .lean()
                .exec();
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            return cartfound;
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    addCart = async () => {
        const products = [];
        const cart = {
            products,
        };
        try {
            const newCart = new this.cartModel(cart);
            newCart.save();
            return newCart;
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    addProduct = async ({ cid, pid }) => {
        try {
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const prodexists = await productModelCart.findOne({ _id: pid });
            if (prodexists === null) {
                return { error: 2, errortxt: "el producto no existe" };
            }
            const prodfound = await this.cartModel.findOne({
                _id: cid,
                "products.product": pid,
            });
            if (prodfound === null) {
                const addedprod = await this.cartModel.updateOne(
                    { _id: cid },
                    { $addToSet: { products: { product: pid } } }
                );
                return addedprod;
            } else {
                const updatedprod = await this.cartModel.updateOne(
                    { _id: cid, "products.product": pid },
                    { $inc: { "products.$.quantity": 1 } }
                );
                return updatedprod;
            }
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    updateAllProducts = async (cid, products) => {
        try {
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const prodids = products.products.map((product) => {
                return product.product;
            });
            const prodexists = await productModelCart.find({
                _id: { $in: prodids },
            });
            if (prodexists.length === products.products.length) {
                const updatedProducts = await this.cartModel.updateOne(
                    { _id: cid },
                    { $set: { products: products.products } }
                );
                return updatedProducts;
            } else {
                return {
                    error: 2,
                    errortxt: "alguno de los productos no existe",
                };
            }
            return prodexists;
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    updateProductQty = async ({ cid, pid, qty }) => {
        try {
            if (isNaN(qty) || !Number.isInteger(parseFloat(qty)) || qty < 1) {
                return {
                    error: 2,
                    errortxt:
                        "quantity tiene que ser un numero entero mayor que 0",
                };
            }
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const prodfound = await this.cartModel.findOne({
                _id: cid,
                "products.product": pid,
            });
            if (prodfound === null) {
                return {
                    error: 2,
                    errortxt: "el producto no esta en el carro",
                };
            } else {
                const updatedprod = await this.cartModel.updateOne(
                    { _id: cid, "products.product": pid },
                    { $set: { "products.$.quantity": qty } }
                );
                return updatedprod;
            }
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    deleteAllProducts = async (cid) => {
        try {
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const deletedProducts = await this.cartModel.updateOne(
                { _id: cid },
                { $set: { products: [] } }
            );
            return deletedProducts;
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    deleteProduct = async ({ cid, pid }) => {
        try {
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const prodfound = await this.cartModel.findOne({
                _id: cid,
                "products.product": pid,
            });
            if (prodfound === null) {
                return {
                    error: 2,
                    errortxt: "el producto no esta en el carro",
                };
            } else {
                const updatedprods = await this.cartModel.updateOne(
                    { _id: cid },
                    { $pull: { products: { product: pid } } }
                );
                return updatedprods;
            }
        } catch (error) {
            return { error: 3, servererror: error };
        }
    };
    closeCart = async ({ cid, user }) => {
        try {
            const cartfound = await this.cartModel.findOne({ _id: cid });
            if (cartfound === null) {
                return { error: 2, errortxt: "el carro no existe" };
            }
            const purchaseproducts = [];
            const outofstock = [];
            const outofstock_id = [];
            let totalpurchase = 0;
            cartfound.products.forEach((product, index) => {
                if (product.quantity <= product.product.stock) {
                    product.product.stock =
                    product.product.stock - product.quantity;
                    purchaseproducts.push(product);
                    totalpurchase += product.product.price * product.quantity;
                } else {
                    outofstock.push(product);
                    outofstock_id.push(product.product._id);
                }
            });
            if (purchaseproducts.length > 0) {
                // Creo el ticket
                const ticket = {
                    code: user.email + "|" + cid,
                    amount: totalpurchase,
                    purchaser: user.email,
                    purchased_products: purchaseproducts,
                };
                const newticket = new ticketModelCart(ticket);
                newticket.save();
                // Guardo el carro actualizado
                const updatedCart = await this.cartModel.updateOne(
                    { _id: cid },
                    { $set: { products: outofstock } }
                );
                // Envio el ticket por mail
                const transport = nodemailer.createTransport({
                    service: "gmail",
                    port: 587,
                    auth: {
                        user: config.MAIL_APP_USER,
                        pass: config.MAIL_APP_PASS,
                    },
                });
                const mailresult = await transport.sendMail({
                    from:
                        "   JaggerStore - Tienda <" +
                        config.MAIL_APP_USER +
                        ">",
                    to: `${user.first_name} ${user.last_name}<${user.email}>`,
                    subject: `Ticket de Compra [${newticket.code}]`,
                    html: `
                    <div>
                        <h1>Compra finalizada</h1>
                        <p>Usuario: ${user.first_name} ${user.last_name}</p>
                        <p>Total Compra: $ ${newticket.amount}</p>
                        <p>Fecha: $ ${newticket.purchase_datetime}</p>
                    </div>
                    `,
                    attachments: [],
                });
                // Envio el ticket por sms
                const client = twilio(config.TWILIO_SID, config.TWILIO_AT);
                const smsresult = await client.messages.create({
                    body: `
JaggerStore Informatica
--------------------------------------------
Compra finalizada
Usuario: ${user.first_name} ${user.last_name}
Total Compra: $ ${newticket.amount}
Fecha: $ ${newticket.purchase_datetime}
--------------------------------------------
`,
                    from: config.TWILIO_PH,
                    to: "+ 54 2645851326",
                });
                purchaseproducts.forEach((product, index) => {
                    const updatedProduct = productModelCart.updateOne(
                        { _id: product.product._id },
                        { $set: { stock: product.product.stock } }
                    );
                });
            }

            return {
                status:
                    outofstock_id.length === 0 ? "Completed" : "Out of stock",
                outofstock_id: outofstock_id,
            };
        } catch (error) {
            return { error: 3, servererror: error };
        }
        return cid;
    };
}

export { CartManagerDB };
