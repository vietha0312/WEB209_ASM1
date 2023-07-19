import React from 'react';
import { IProduct } from '../interfaces/Product';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/products/${product._id}`} className="block">
             <div className='rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg'>
             <div className="aspect-w-3 aspect-h-4 mt-2">
                <img
                  alt={product.name}
                  src={product.image}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 mb-2">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="font-bold">Price: ${product.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">
                  Buy
                </button>
              </div>
             </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
