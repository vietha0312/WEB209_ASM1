import React, { useState } from 'react';
import { signin } from '../../api/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Nav from '../../component/nav';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Gọi API để thực hiện đăng nhập
      const user = { email, password };
      const response = await signin(user);

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('users', JSON.stringify(response.data));

      // Chuyển hướng đến trang dashboard nếu đăng nhập thành công
      navigate('/admin/dash');
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  return (
    <div>
     
        <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Login to your account</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6">
            <label className="block font-semibold">Username or Email</label>
            <Input
             
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Password</label>
            <Input
             
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <div className="flex justify-between items-baseline">
              <Button
                type="primary"
                onClick={handleLogin}
                className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              >
                Login
              </Button>
              <a href="" className="text-sm hover:underline">
              <Link to={'/admin/register'}>
              Chưa có tài khoản
              </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default Login;
