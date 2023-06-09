import { useState } from 'react';
import './../styles.css'
import { Link, useNavigate } from 'react-router-dom'


export default function Home() {
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: '',
        longDescription: '',
        attributes: '',
        salePrice: '',
        stock: '',
    });
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            longDescription: formData.get('longDescription'),
            attributes: formData.get('attributes'),
            salePrice: formData.get('salePrice'),
            stock: parseFloat(formData.get('stock')),

        };

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            navigate(0)
            // Product added successfully, you can perform additional actions here
            console.log('Product added successfully');
        } catch (error) {
            console.error(error);
            // Handle error state and display an error message to the user
        }
    };

    return (
        <>
            <div className="App">
                <h1 style={{ textAlign: 'center' }}>Hello</h1>
                {/* <button href={Product}>
        products page
      </button> */}
                <Link to='/products'>
                    <h2>Products</h2>
                </Link>
                <form onSubmit={handleSubmit} className='input-form'>
                    <label>
                        Name:
                        <input value={formValues.name} type="text" name="name"
                            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input value={formValues.description} type="text" name="description"
                            onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input value={formValues.price} type="number" name="price"
                            onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Long Description:
                        <input value={formValues.longDescription} type="text" name="longDescription"
                            onChange={(e) => setFormValues({ ...formValues, longDescription: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Attributes:
                        <input value={formValues.attributes} type="text" name="attributes"
                            onChange={(e) => setFormValues({ ...formValues, attributes: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Sale Price:
                        <input value={formValues.salePrice} type="number" name="salePrice"
                            onChange={(e) => setFormValues({ ...formValues, salePrice: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Stock:
                        <input value={formValues.stock} type="number" name="stock"
                            onChange={(e) => setFormValues({ ...formValues, stock: e.target.value })}
                        />
                    </label>
                    <br />
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </>
    );
}