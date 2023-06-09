import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <Link to='/'><h1>Home</h1></Link>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {/* Display other product details */}
        </div>
    );
}
