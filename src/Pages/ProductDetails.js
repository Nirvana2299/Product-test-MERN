import { useEffect, useState } from 'react';

export default function ProductDetails({ match }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productId = match.params.id;
        fetch(`/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [match.params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {/* Display other product details */}
        </div>
    );
}


