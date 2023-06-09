import './../styles.css'
import { Link } from 'react-router-dom'

export default function Home() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            longDescription: formData.get('longDescription')
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
                        <input type="text" name="name" />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" name="description" />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input type="number" name="price" />
                    </label>
                    <br />
                    <label>
                        Long Description:
                        <input type="text" name="longDescription" />
                    </label>
                    <br />
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </>
    );
}