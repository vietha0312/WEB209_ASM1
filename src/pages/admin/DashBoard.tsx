import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/Product';
import { deleteProduct, getAllProduct } from '../../api/product';
import ProductItem from '../../component/productItem';
import { message, Layout, Menu, Breadcrumb } from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const user = JSON.parse(localStorage.getItem('users') || '{}');
  console.log(user.user.role);
  if (user.user.role !== 'admin') {
    message.error('Bạn không có quyền truy cập vào trang quản lí!');
    navigate('/'); // Chuyển hướng người dùng đến trang không có quyền truy cập
    return null;
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('users');

    // Redirect to the login page
    navigate('/');
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);

      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  return (
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Danh sách sản phẩm
          </Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>
            <Link to={'/'}>
              Trang chủ
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
        
          <div>
            <h2>Danh sách sản phẩm</h2>
            <ul>
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onDeleteClick={handleDeleteProduct}
                />
              ))}
            </ul>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
