import React, { useState, useEffect } from 'react';
import { getAllProduct } from '../api/product';
import { IProduct } from '../interfaces/Product';
import Nav from '../component/nav';
import ProductList from '../component/productList';
import Footer from '../component/footer';
import Banner from '../component/banner';
import ProductFilter from '../component/productFilter';
import { ICategory } from '../interfaces/Category';

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getAllProduct()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((product) => product.categoryId === selectedCategory);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
  };

  return (
    <div>
      <Nav />
      <div>
        <Banner />
        <div className="pt-10">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="px-4 md:px-10 pt-6 md:pt-10">
          <ProductList products={filteredProducts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
