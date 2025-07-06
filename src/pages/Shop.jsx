import React from 'react'
import Header from '../components/Header'
import PageLocation from '../components/PageLocation'
import ProductsComponent from '../components/ProductsComponent'
import CategoriesForProducts from '../components/CategoriesForProducts'

const Shop = () => {
  return (
    <div>
 <PageLocation 
 page = "Shop"
 />
 <br />
 <CategoriesForProducts />
 <ProductsComponent />
    </div>
  )
}

export default Shop
