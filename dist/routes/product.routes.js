"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
let products = [
    {
        id: "1",
        product_name: "Card",
        product_description: "this is pokemon card",
        product_price: 1200,
    },
];
// Get all products
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// Post
productRouter.post("/", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
    };
    products = [...products, newProduct];
    res.status(201).json("Product added successfully...");
});
// Get by id
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const result = products.find((product) => product.id === id);
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json("product not found!");
    }
});
// Put by id
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        const updatedProduct = Object.assign(Object.assign({}, products[index]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[index].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[index].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[index].product_price });
        products[index] = updatedProduct;
        res.status(201).json(updatedProduct);
    }
    else {
        res.status(404).json("No");
    }
});
// Delete by id
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const findTodo = products.find((prodct) => prodct.id === id);
    if (findTodo) {
        products = products.filter((prodct) => prodct.id !== id);
        res.status(200).send(`Product was deleted successfully...`);
    }
    else {
        res.status(404).send(`Product not found!`);
    }
});
exports.default = productRouter;
