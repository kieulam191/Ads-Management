import {React, useState} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './login.css'

const LoginForm = () => {
  const goRouter = useNavigate();
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
  const handleLogin = () => {
    if(username && password){
        const user = {username: username, password: password};
        let dataLogin = JSON.stringify(user);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/',
            headers:{
              'Content-Type': 'application/json'
            },
            data: dataLogin
        };
        axios.request(config)
        .then(res => {
        console.log(JSON.stringify(res.data))
        })

        goRouter('/');
    }
    
  };

  return (
    <div className='login'>
      <h2>Đăng nhập</h2>
      <form>
        <label>
          <span>Tên đăng nhập:</span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <span>Mật khẩu:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className='btn' type="button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
