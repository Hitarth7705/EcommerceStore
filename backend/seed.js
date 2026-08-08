const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Premium Wireless Headphones",
        description:
            "High-quality wireless headphones with active noise cancellation and deep bass.",
        price: 4999,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        stock: 25,
        rating: 4.5,
        numReviews: 120
    },

    {
        name: "Smart Watch Pro",
        description:
            "Modern smartwatch with fitness tracking, heart rate monitoring and notifications.",
        price: 6999,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        stock: 15,
        rating: 4.3,
        numReviews: 85
    },

    {
        name: "Classic Sneakers",
        description:
            "Comfortable everyday sneakers with a clean modern design.",
        price: 2999,
        category: "Fashion",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        stock: 40,
        rating: 4.7,
        numReviews: 210
    },

    {
        name: "Minimal Backpack",
        description:
            "Stylish and durable backpack suitable for college, work and travel.",
        price: 1899,
        category: "Fashion",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        stock: 30,
        rating: 4.4,
        numReviews: 65
    },

    {
        name: "Mechanical Keyboard",
        description:
            "RGB mechanical keyboard with tactile switches and compact layout.",
        price: 3499,
        category: "Electronics",
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        stock: 18,
        rating: 4.6,
        numReviews: 98
    },

    {
        name: "Ceramic Coffee Mug",
        description:
            "Elegant ceramic coffee mug for your daily coffee or tea.",
        price: 599,
        category: "Home",
        image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=800&q=80",
        stock: 60,
        rating: 4.2,
        numReviews: 45
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products inserted successfully");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProducts();