import { useEffect, useState } from "react";
import API from "../api";
function Admin() {

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const token = localStorage.getItem("token");

    const loadProducts = async () => {

        const response = await fetch(
           `${API}/api/products`
        );

        const data = await response.json();

        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const createProduct = async (e) => {

        e.preventDefault();

        const response = await fetch(
            `${API}/api/products`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock)
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Product created");

            setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                stock: ""
            });

            loadProducts();

        } else {

            alert(data.message);
        }
    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) {
            return;
        }

        const response = await fetch(
            `${API}/api/products/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            loadProducts();

        } else {

            alert(data.message);
        }
    };

    return (
        <div className="admin-page">

            <h1>Admin Dashboard</h1>

            <div className="admin-layout">

                <form
                    className="admin-form"
                    onSubmit={createProduct}
                >

                    <h2>Add Product</h2>

                    <input
                        placeholder="Product name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        placeholder="Price"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                price: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                image: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        placeholder="Stock"
                        type="number"
                        value={form.stock}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stock: e.target.value
                            })
                        }
                        required
                    />

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Add Product
                    </button>

                </form>

                <div className="admin-products">

                    <h2>Products</h2>

                    {products.map((product) => (

                        <div
                            className="admin-product"
                            key={product._id}
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div>
                                <strong>
                                    {product.name}
                                </strong>

                                <p>
                                    ₹{product.price}
                                </p>
                            </div>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    deleteProduct(product._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Admin;