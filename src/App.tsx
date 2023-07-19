import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/ProductDetail'

import Regester from './pages/admin/Regester'
import DashBoard from './pages/admin/DashBoard'
import ProductManagement from './pages/admin/ProductManagement'
import AddProduct from './pages/admin/AddProduct'
import UpdateProduct from './pages/admin/UpdateProduct'
import EditProduct from './pages/admin/UpdateProduct'
import Login from './pages/admin/Login'

function App() {
  

  return (
    <div className="App">
    <Routes>
      <Route path='/'>
      <Route index element={<HomePage />} />
      <Route path='/products' element={<ProductPage/>}/>
      <Route path='/products/:productId' element={<ProductDetail/>}/>
      </Route>

      <Route path='/admin'>
          <Route index element={<Login />} />
          <Route path='register' element={<Regester />} />
          <Route path='login' element={<Login />} />
          <Route path='dash' element={<DashBoard />} />
         
          <Route path='products'>
            <Route index element={<ProductManagement />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='update/:productId' element={<EditProduct/> } />
          </Route>
        </Route>

      
    </Routes>
    </div>
  )
}

export default App
