import {React, useState} from 'react';

import { Form, Input, Button, Checkbox } from 'antd';


const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleLogin = (values) => {
    console.log('Đăng nhập:', values);
    history.push('/');
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          onChange={handleInputChange}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          onChange={handleInputChange}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Nhớ đăng nhập</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
