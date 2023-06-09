
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleDelete = (productId) => {
        fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                const updatedProducts = products.filter(product => product._id !== productId);
                setProducts(updatedProducts);
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <div>
        <Link to='/'><h1>
            Home
        </h1></Link>
            <h2 style={{textAlign: 'center'}}>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <Link to={`/products/${product._id}`}>{product.name}</Link>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
        </div>
    );
}

