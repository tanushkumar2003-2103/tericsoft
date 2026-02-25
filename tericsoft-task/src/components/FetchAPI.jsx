import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function FetchAPI() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://fakestoreapi.com/products"
                );
                setData(response.data);
            } catch (err) {
                setError("Something went wrong!");
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-black body-font">
            <h1 className="text-3xl font-bold text-center my-8">Products List</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="container px-5 py-10 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {data.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
                        >
                            <img
                                alt={product.title}
                                className="h-48 w-full object-contain mb-4"
                                src={product.image}
                            />

                            <h3 className="text-xs text-gray-500 mb-1">
                                CATEGORY: {product.category}
                            </h3>

                           
                            <h2 className="text-lg font-medium text-gray-900 min-h-[60px]">
                                {product.title}
                            </h2>

                            <p className="mt-2 font-semibold">₹{product.price}</p>

                            {/* Stars */}
                            <div className="flex items-center text-yellow-500 mt-1">
                                {"⭐".repeat(Math.round(product.rating.rate))}
                                <span className="text-sm text-gray-600 ml-2">
                                    ({product.rating.rate})
                                </span>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="mt-auto w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default FetchAPI;