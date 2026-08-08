import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import { CartContext } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } =
        useContext(CartContext);

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetch(
            `http://localhost:5000/api/products/${id}`
        )
            .then(response => response.json())
            .then(data => {

                setProduct(data);
                setLoading(false);

            })
            .catch(error => {

                console.error(error);
                setLoading(false);

            });

    }, [id]);


    if (loading) {

        return (
            <div className="loading">
                Loading product...
            </div>
        );

    }


    if (!product) {

        return (
            <div className="loading">
                Product not found.
            </div>
        );

    }


    return (

        <div className="product-details">

            <div className="details-image">

                <img
                    src={product.image}
                    alt={product.name}
                />

            </div>


            <div className="details-content">

                <span className="category">
                    {product.category}
                </span>

                <h1>
                    {product.name}
                </h1>

                <div className="rating">
                    ★ {product.rating}

                    <span>
                        ({product.numReviews} reviews)
                    </span>
                </div>

                <h2>
                    ₹
                    {product.price.toLocaleString(
                        "en-IN"
                    )}
                </h2>

                <p>
                    {product.description}
                </p>

                <p className="stock">
                    <strong>
                        Stock:
                    </strong>{" "}
                    {product.stock}
                </p>

                <button
                    className="primary-button"
                    onClick={() => {

                        addToCart(product);

                        navigate("/cart");

                    }}
                >
                    Add to Cart
                </button>

            </div>

        </div>

    );
}

export default ProductDetails;