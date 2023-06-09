import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [del, setDelete] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    const handleDelete = (productId) => {
        fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                const updatedProducts = del.filter(product => product._id !== productId);
                setDelete(updatedProducts);
                navigate('/products')
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }
console.log(product);
    return (
        <div>
        <Link to='/'><h1>Home</h1></Link>
            <h2>{`Name: ${product.name}`}</h2>
            <h3>{`Description: ${product.description}`}</h3>
            <h4>{`Long Description: ${product.longDescription}`}</h4>
            {/* Display other product details */}
            <Link to={`/products/${id}/edit`}>
                <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
    );
}
