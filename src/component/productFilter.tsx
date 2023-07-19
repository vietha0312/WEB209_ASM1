import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/category'; // Import the getAllCategories API
import { ICategory } from '../interfaces/Category';

const ProductFilter = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categoriesData = await getAllCategories();
          setCategories(categoriesData);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
  return (
    <div className="flex space-x-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={() => onCategoryChange('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          className="bg-gray-200 hover:bg-blue-300 text-gray-800 py-2 px-4 rounded-md"
          onClick={() => onCategoryChange(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
