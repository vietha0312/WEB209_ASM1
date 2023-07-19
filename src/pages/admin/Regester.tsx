import React, { useState } from 'react';
import { signup } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      // Gọi API để thực hiện đăng ký
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const response = await signup(user);

      // Lưu thông tin người dùng đã đăng ký vào localStorage hoặc Redux store
      localStorage.setItem('user', JSON.stringify(response.data));

      // Chuyển hướng đến trang dashboard hoặc trang nào đó sau khi đăng ký thành công
      navigate('/admin');
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      message.error('Đăng ký thất bại!');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                alt="Sign up"
                className="btn-"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
              <Form form={form} onFinish={handleSubmit} className="w-full mt-6 relative space-y-8">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                    {
                      validator: (_, value) => {
                        if (value !== form.getFieldValue('password')) {
                          return Promise.reject('Mật khẩu không khớp');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <svg
              viewBox="0 0 91 91"
              className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current"
            >
              {/* SVG code */}
            </svg>
            <svg
              viewBox="0 0 91 91"
              className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current"
            >
              {/* SVG code */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
