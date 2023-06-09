import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        // Add other fields here
    });

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    const handleChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform update API call with the updated product data
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(() => {
                // Redirect to the product details page after successful update
                navigate(`/products/${id}`);
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <Link to='/'><h1>Home</h1></Link>
            <h2 style={{textAlign: 'center'}}>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {/* Add other fields for editing */}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
