const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                image: {
                    type: String
                }
            }
        ],

        shippingAddress: {
            fullName: String,
            address: String,
            city: String,
            state: String,
            postalCode: String,
            phone: String
        },

        paymentMethod: {
            type: String,
            default: "Cash on Delivery"
        },

        totalPrice: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Processing"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);