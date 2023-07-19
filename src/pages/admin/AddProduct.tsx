import React, { useEffect, useState } from 'react';
import { addProduct } from '../../api/product';
import { ICategory } from '../../interfaces/Category';
import { getAllCategories } from '../../api/category';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select,Alert } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddProduct = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
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

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const newProduct = await addProduct(values);
      console.log('Sản phẩm mới:', newProduct);
      setSuccessMessageVisible(true);
     
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };

  return (
    <div>
      <h1>Thêm sản phẩm mới</h1>
      {successMessageVisible && (
        <Alert
          message="Thêm sản phẩm thành công!"
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessageVisible(false)}
          style={{ marginBottom: 16 }}
        />
      )}
      <Form form={form} name="add_product" onFinish={onFinish}>
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
        <Form.List name="details">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item key={field.key} label={`Chi tiết ${index + 1}`}>
                  <Input.Group compact>
                    <Form.Item name={[field.name, 'key']} noStyle>
                      <Input placeholder="Tên chi tiết" style={{ width: '40%' }} />
                    </Form.Item>
                    <Form.Item name={[field.name, 'value']} noStyle>
                      <Input placeholder="Giá trị" style={{ width: '60%' }} />
                    </Form.Item>
                  </Input.Group>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(field.name)} style={{ marginLeft: 8 }} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm chi tiết
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
      {successMessageVisible ? (
        <Link to="/admin/dash">Quay lại</Link>
      ) : (
        <Link to="#">Quay lại</Link> // Replace '#' with the appropriate URL for navigating back
      )}
     
    </div>
  );
};

export default AddProduct;
