import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/Product';
import { ICategory } from '../../interfaces/Category';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/product';
import { getAllCategories } from '../../api/category';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const UpdateProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }
    // Gọi API để lấy thông tin sản phẩm cần chỉnh sửa
    getProductById(productId)
      .then((product) => {
        setProduct(product);
       
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      });

    // Gọi API để lấy danh sách tất cả danh mục sản phẩm
    getAllCategories()
      .then((categoriesData) => {
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách danh mục sản phẩm:', error);
      });
  }, [productId]);

  const onFinish = async (values: any) => {
    try {
      // Gọi API để cập nhật thông tin sản phẩm
      await updateProduct(productId, values);
      message.success('Cập nhật sản phẩm thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  if (!product) {
    // Xử lý khi đang tải dữ liệu hoặc có lỗi
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chỉnh sửa sản phẩm</h1>
      <Form initialValues={product} onFinish={onFinish}>
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Ảnh" name="image" rules={[{ required: true, message: 'Vui lòng nhập URL ảnh sản phẩm' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
          <Select placeholder="Chọn danh mục">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
