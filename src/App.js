import './styles.css';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditProduct from './Pages/EditProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/products/:id/edit' element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

