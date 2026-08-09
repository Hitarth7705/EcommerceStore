import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetch("http://localhost:5000/api/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error(
                    "Error loading products:",
                    error
                );
            });

    }, []);

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (
        <div>

            {/* HERO */}

            <section className="hero">

                <div className="hero-content">

                    <p className="hero-label">
                        WELCOME TO QEVANTA
                    </p>

                    <h1>
                        Everything you need.
                        <br />
                        All in one place.
                    </h1>

                    <p className="hero-description">
                        Discover premium products
                        at great prices.
                    </p>

                    <a
                        href="#products"
                        className="hero-button"
                    >
                        Shop Now
                    </a>

                </div>

            </section>


            {/* PRODUCTS */}

            <section
                className="products-section"
                id="products"
            >

                <div className="section-header">

                    <div>

                        <p className="section-label">
                            OUR COLLECTION
                        </p>

                        <h2>
                            Featured Products
                        </h2>

                    </div>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>


                <div className="product-grid">

                    {filteredProducts.map(product => (

                        <Link
                            to={`/product/${product._id}`}
                            className="product-card"
                            key={product._id}
                        >

                            <div className="product-image">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                            </div>

                            <div className="product-info">

                                <span className="category">
                                    {product.category}
                                </span>

                                <h3>
                                    {product.name}
                                </h3>

                                <div className="rating">
                                    ★ {product.rating}
                                    <span>
                                        ({product.numReviews})
                                    </span>
                                </div>

                                <strong>
                                    ₹
                                    {product.price.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                        </Link>

                    ))}

                </div>

                {filteredProducts.length === 0 && (

                    <div className="no-products">
                        No products found.
                    </div>

                )}

            </section>

        </div>
    );
}

export default Home;