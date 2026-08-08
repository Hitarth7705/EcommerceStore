const express = require("express");

const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE ORDER
router.post("/", protect, async (req, res) => {

    try {

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                message: "No order items"
            });
        }

        const order = await Order.create({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// GET MY ORDERS
router.get("/myorders", protect, async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        })
            .populate("orderItems.product")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// GET ALL ORDERS - ADMIN
router.get("/", protect, async (req, res) => {

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


module.exports = router;