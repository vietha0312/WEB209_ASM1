import React, { useEffect, useState } from 'react';
import { getProductById } from '../api/product';
import { useParams } from 'react-router-dom';
import { IProduct } from '../interfaces/Product';

const ProductDetail: React.FC = () => {
  
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }

    // Gọi API Backend để lấy thông tin chi tiết sản phẩm dựa trên productId
    getProductById(productId)
      .then((product) => {
        setProduct(product);
       
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      });
  }, [productId]);

  if (!product) {
    // Xử lý khi đang tải dữ liệu hoặc có lỗi
    return <div>Loading...</div>;
  }
console.log(product)
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{product.description}</p>
      <p>Giá: ${product.price}</p>
      <p>Loại sản phẩm: {product.category?.name}</p> {/* Hiển thị tên loại sản phẩm (nếu có) */}
    </div>
  );
};

export default ProductDetail;
